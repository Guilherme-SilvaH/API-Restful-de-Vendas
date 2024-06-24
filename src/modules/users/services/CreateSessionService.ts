import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
  user: User,
  token: String
}




class CreateSessionService{
    public async execute({ email, password }: IRequest): Promise<IResponse>{
      const usersRepository = getCustomRepository(UsersRepository);
      const user = await usersRepository.findByEmail(email);


      if (!user) {
        throw new AppError('Incorrect email/password combination.', 401)
      }


      const passwordConfirmed = await compare(password, user.password);//compara a senha passada pelo usuario com a senha criptografa do banco de dados

      if (!passwordConfirmed) {
       throw new AppError('Incorrect email/password combination.', 401)
      }


      const token = sign({}, '799a45aba8f4a08738d124d17e058d03', {
        subject: user.id,
        expiresIn: '1d'
      })


      return {user, token};
    }


}

export default CreateSessionService;




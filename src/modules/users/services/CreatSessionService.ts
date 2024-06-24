import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";



interface IRequest {
    email: string;
    password: string;
}





class CreateSessionService{
    public async execute({ email, password }: IRequest): Promise<User>{
      const usersRepository = getCustomRepository(UsersRepository);
      const user = await usersRepository.findByEmail(email);


      if (!user) {
        throw new AppError('Incorrect email/password combination.', 401)
      }


      const passwordConfirmed = await compare(password, user.password);//compara a senha passada pelo usuario com a senha criptografa do banco de dados

      if (!passwordConfirmed) {
       throw new AppError('Incorrect email/password combination.', 401)
      }


      return user;
    }


}

export default CreateSessionService;




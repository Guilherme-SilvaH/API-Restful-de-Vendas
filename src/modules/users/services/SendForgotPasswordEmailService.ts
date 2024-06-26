import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";




interface IRequest {
    email: string;
}


class SendForgotPasswordEmailService{
    public async execute({ email }: IRequest): Promise<void>{
      const usersRepository = getCustomRepository(UsersRepository);
      const userTokenRepository = getCustomRepository(UsersTokensRepository);

      const user = await usersRepository.findByEmail(email)

      if(!user){
        throw new AppError('User does not exists')
      };

      const token = await userTokenRepository.genarate(user.id);

      console.log(token);

    }



}

export default SendForgotPasswordEmailService;




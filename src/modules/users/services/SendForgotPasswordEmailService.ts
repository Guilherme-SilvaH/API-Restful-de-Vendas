import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";



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

      const {token} = await userTokenRepository.genarate(user.id);

      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[Api Vendas] Recuperação de Senha',
        templateData: {
          template: `Olá {{name}}: {{token}}`,
          variables: {
            name: user.name,
            token,
        },
        }
      })
    }



}

export default SendForgotPasswordEmailService;




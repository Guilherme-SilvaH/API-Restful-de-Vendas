import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";
import AppError from "@shared/errors/AppError";



interface IRequest {
  id: string;
}


class ShowUserService{
    public async execute({id}: IRequest): Promise<User>{
        const UserRepository = getCustomRepository(UsersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const user = await UserRepository.findOne(id);

        //verificars se ja existe o produco com o name passado
        if(!user){
          throw new AppError('User not found')
        }

        return user;
    }
}

export default ShowUserService;

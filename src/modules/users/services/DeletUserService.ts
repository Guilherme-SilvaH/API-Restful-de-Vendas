import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";


interface IRequest {
  id: string;
}


class DeleteUserService{
    public async execute({id}: IRequest): Promise<void>{
        const usersRepository = getCustomRepository(UsersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const user = await usersRepository.findOne(id);
        //verificars se ja existe o produco com o name passado
        if(!user){
          throw new AppError('User not found')
        }
        await usersRepository.remove(user);
    }
}

export default DeleteUserService;

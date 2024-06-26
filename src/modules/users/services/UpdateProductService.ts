import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";


interface IRequest {
  id: string;
  name: string;
  email: string,
}


class UpdateUserService{
    public async execute({ id, name, email}: IRequest): Promise<User>{
        const userRepositorys = getCustomRepository(UsersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const user = await userRepositorys.findOne(id);

        //verificars e o id do produto esta cadastrado em nosso DB
        if(!user){
          throw new AppError('User not found')
        }

        const userExists = await userRepositorys.findByName(name);
        //verificars se ja existe o produco com o name passado
        if(userExists && name != user.name){
            throw new AppError('There is already one User with this name',)
        }
        //se passar de todas as verificaçoes, atualiza os dados
        user.name = name;
        user.email = email;


        await userRepositorys.save(user);
        return user;
    }
}

export default UpdateUserService;

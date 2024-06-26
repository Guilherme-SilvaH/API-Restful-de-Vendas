import { getCustomRepository } from "typeorm";
import fs from 'fs'
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from '@config/upload'





interface IRequest {
    user_id: string;
    avatarFileName: string;
}


class UpdateUserAvatarService{
    public async execute({user_id, avatarFileName}: IRequest): Promise<User>{
      const usersRepository = getCustomRepository(UsersRepository);

      const user = await usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }

      if(user.avatar){
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);// onde ira procurar o arquivo
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)// verificar se realmnete o arquivo existe nesse path


        if(userAvatarFileExists){//se existir, iremos excluir ele para poder adionar um avatar novo, para nao deixar arquivo descenessario
          await fs.promises.unlink(userAvatarFilePath);
        }
      }

      user.avatar = avatarFileName;

      await usersRepository.save(user);

      return user
    }




}

export default UpdateUserAvatarService;




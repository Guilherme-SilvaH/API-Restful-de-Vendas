import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../typeorm/entities/User';


class UsersController {

  public async index(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const usersRepository = getRepository(User);
    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }
}

export default UsersController;

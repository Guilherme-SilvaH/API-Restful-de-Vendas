import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import { Request, Response } from "express";

export default class UsersController{


  public async index(request: Request, response: Response): Promise<Response>{
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(users);
  };


  public async create(request: Request, response: Response): Promise<Response>{
    const {name, email, password } = request.body

    const creatUser = new CreateUserService()

    const user = await creatUser.execute({
      name,
      email,
      password
    });

    return response.json(user)
  }
}

import { Router  } from "express";

import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";


const usersRouter = Router()
const usersController = new UsersController

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/',
  //celabrete seria o middleware
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),

  usersController.create
)


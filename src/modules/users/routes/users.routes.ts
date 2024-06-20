import { Router  } from "express";

import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";


const usersRouter = Router()
const usersController = new UsersController

usersRouter.get('/', usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  async (req, res, next) => {
    try {
      console.log('Request Body:', req.body);
      await usersController.create(req, res);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  }
);


export default usersRouter


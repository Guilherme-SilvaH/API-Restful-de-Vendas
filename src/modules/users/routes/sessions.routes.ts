import { Router  } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controllers/SessionsController";



const sessionsRouter = Router()
const sessionController = new SessionsController


sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  async (req, res, next) => {
    try {
      console.log('Request Body:', req.body);
      await sessionController.create(req, res);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  }
);


export default sessionsRouter


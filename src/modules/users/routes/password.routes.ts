import { Router  } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controllers/SessionsController";
import ForgotPasswordController from "../controllers/ForgotPasswordController";



const passwordRouter = Router()
const ForgotPassworController = new ForgotPasswordController


passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }),
  async (req, res, next) => {
    try {
      console.log('Request Body:', req.body);
      await ForgotPassworController.create(req, res);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  }
);


export default passwordRouter


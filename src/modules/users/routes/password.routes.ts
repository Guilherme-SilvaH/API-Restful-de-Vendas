import { Router  } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";



const passwordRouter = Router()
const ForgotPassworController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController()


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


passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  async (req, res, next) => {
    try {
      console.log('Request Body:', req.body);
      await resetPasswordController.create(req, res);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  }
);

export default passwordRouter;




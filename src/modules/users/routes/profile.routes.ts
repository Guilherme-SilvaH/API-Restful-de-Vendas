import { Router  } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";



const profileRouter = Router()
const profileController = new ProfileController();


profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {is: Joi.exist(), then: Joi.required})
    }
  }),
  async (req, res, next) => {
    try {
      console.log('Request Body:', req.body);
      await profileController.update(req, res);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  }
);


export default profileRouter;


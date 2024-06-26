import { Router  } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from 'multer';
import uploadConfig from "@config/upload";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersAvatarController from "../controllers/UsersAvatarController";


const usersRouter = Router()
const usersController = new UsersController;
const usersAvatarController = new UsersAvatarController;

const upload = multer(uploadConfig)

usersRouter.get('/', isAuthenticated , usersController.index);

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


usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update
);


export default usersRouter


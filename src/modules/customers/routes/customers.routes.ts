import { Router } from "express"
import { celebrate, Joi, Segments } from 'celebrate'
import CustomersController from "../controllers/CustomersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";



const CustumersRouter = Router()//instancia para pegar os metodos dos ROUTER
const customersController = new CustomersController();



CustumersRouter.use(isAuthenticated)
//Rota para listar todos os produtos
CustumersRouter.get('/', customersController.index);

//Rota para listar um produto atraves de um ID do produto
CustumersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show
);

//Rota para Criar um produto
CustumersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }),
  customersController .create
);


//Rota para Atualizar um produto
CustumersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },

    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),
customersController .update
);


//Rota para Deletar um produto
CustumersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),

  customersController .delete
);


export default CustumersRouter;

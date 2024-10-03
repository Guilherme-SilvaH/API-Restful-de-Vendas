import { Router } from "express"
import { celebrate, Joi, Segments } from 'celebrate'
import OrdersController from "../controllers/OrdersController";



const ordersRouter = Router()//instancia para pegar os metodos dos ROUTER
const ordersController = new OrdersController();




//Rota para listar as orders
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show
);

//Rota para Criar uma order
ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required()
    }
  }),
  ordersController.create
);
;


export default ordersRouter;

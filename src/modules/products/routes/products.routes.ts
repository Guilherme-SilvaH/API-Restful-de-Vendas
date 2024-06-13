import { Router } from "express"
import { celebrate, Joi, Segments } from 'celebrate'
import ProductsController from "../controllers/ProductsController"


const productsRouter = Router()//instancia para pegar os metodos dos ROUTER
const productsController = new ProductsController();



//Rota para listar todos os produtos
productsRouter.get('/', productsController.index);

//Rota para listar um produto atraves de um ID do produto
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show
);

//Rota para Criar um produto
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productsController.create
);


//Rota para Atualizar um produto
productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    },

    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),
productsController.update
);


//Rota para Deletar um produto
productsRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),

  productsController.delete
);


export default productsRouter;

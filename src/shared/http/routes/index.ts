import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";


const routes = Router();

routes.use('/products', productsRouter);//vamos usar essa rota para acessar nossa RouterProducts, exemplo, get/products/:id
routes.use('/users', usersRouter)

export default routes


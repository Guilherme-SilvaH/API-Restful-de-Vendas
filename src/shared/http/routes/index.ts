import productsRouter from "@modules/products/routes/products.routes";
import { Router } from "express";


const routes = Router();

routes.use('/products', productsRouter);//vamos usar essa rota para acessar nossa RouterProducts, exemplo, get/products/:id

export default routes


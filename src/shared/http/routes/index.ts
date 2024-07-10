import productsRouter from "@modules/products/routes/products.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import { Router } from "express";
import profileRouter from "@modules/users/routes/profile.routes";
import CustumersRouter from "@modules/customers/routes/customers.routes";


const routes = Router();

routes.use('/products', productsRouter);//vamos usar essa rota para acessar nossa RouterProducts, exemplo, get/products/:id
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter)
routes.use('/customers', CustumersRouter)

export default routes


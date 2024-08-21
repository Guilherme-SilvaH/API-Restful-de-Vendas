import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrderRepository";
import AppError from "@shared/errors/AppError";


interface IProduct {
    id: string;
    quantity: number
}

interface IRequest {
    id: string
}


class ShowOrderService{
    public async execute({ id}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository
     
        const order = await ordersRepository.findById(id);
        if(!order){
            throw new AppError('Order not Found',)
    
        };
        return order

    };
 
}
export default ShowOrderService;

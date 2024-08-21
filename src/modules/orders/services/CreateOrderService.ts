import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrderRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";


interface IProduct {
    id: string;
    quantity: number
}


interface IRequest {
    customer_id: string
    products: IProduct[]
}


class CreateOrderService{
    public async execute({customer_id, products}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepositorys = getCustomRepository(ProductRepository);

        const customerExists = await customersRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError('Could not find any customer with the given ID.',)
    
        };

        const existsProdutcs = await productsRepositorys.findAllByIds(products);
        
    }
}

export default CreateOrderService;

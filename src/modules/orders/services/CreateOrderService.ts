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


        if (!existsProdutcs.length) {
            throw new AppError('Could not find any products with the given IDS.',)
        };

        const existsProdutcsIds = existsProdutcs.map((product) => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProdutcsIds.includes(product.id),
        );


        if (checkInexistentProducts.length) {
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`)
        };
        
        const quantityAvailable = products.filter(
            product => existsProdutcs.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0]. id}`)
        };

        const serializedProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProdutcs.filter(p => p.id === product.id)[0].price,
            })
        );

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });


        const {order_products } = order;

        const updatedProductQuantity = order_products.map(
            product => (
                {
                    id: product.product_id,
                    quantity: existsProdutcs.filter(p => p.id === product.id)[0].quantity - product.quantity,
                }
            )
        );

        await productsRepositorys.save(updatedProductQuantity);
        
        

        return order

    };

 
}

export default CreateOrderService;

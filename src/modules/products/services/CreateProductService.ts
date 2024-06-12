import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";


interface IRequest {
    name: string;
    price: number;
    quantity: number;
}


class CreateProductService{
    public async execute({name, price, quantity}: IRequest): Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository
        const productExists = await productsRepository.findByName(name);
        if(productExists){
            throw new AppError('There is already one product with this name',)
        }
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await productsRepository.save(product);

        return product;

    }
}

export default CreateProductService;

import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";


interface IRequest {
  id: string;
}


class ShowProductService{
    public async execute({id}: IRequest): Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const product = await productsRepository.findOne(id);

        //verificars se ja existe o produco com o name passado
        if(!product){
          throw new AppError('Product not found')
        }

        return product;
    }
}

export default ShowProductService;

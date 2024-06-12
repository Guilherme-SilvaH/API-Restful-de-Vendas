import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";


interface IRequest {
  id: string;
}


class DeleteProductService{
    public async execute({id}: IRequest): Promise<void>{
        const productsRepository = getCustomRepository(ProductRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const product = await productsRepository.findOne(id);
        //verificars se ja existe o produco com o name passado
        if(!product){
          throw new AppError('Product not found')
        }
        await productsRepository.remove(product);
    }
}

export default DeleteProductService;

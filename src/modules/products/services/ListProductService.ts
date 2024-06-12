import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListroductService{
    public async execute(): Promise<Product[]>{
        const productsRepository = getCustomRepository(ProductRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const products = productsRepository.find();

        return products;
    }
}

export default ListroductService;

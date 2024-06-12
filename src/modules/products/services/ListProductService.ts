import { getCustomRepository } from "typeorm";
import  ProductRepository from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository); // Utilizamos o getCustomRepository quando já temos um repositório customizado, se não, usamos o getRepository
        const products = await productsRepository.find();
        return products;
    }
}

export default ListProductService;

import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";


interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


class UpdateProductService{
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const product = await productsRepository.findOne(id);

        //verificars e o id do produto esta cadastrado em nosso DB
        if(!product){
          throw new AppError('Product not found')
        }

        const productExists = await productsRepository.findByName(name);
        //verificars se ja existe o produco com o name passado
        if(productExists && name != product.name){
            throw new AppError('There is already one product with this name',)
        }
        //se passar de todas as verificaçoes, atualiza os dados
        product.name = name;
        product.price = price;
        product. quantity = quantity;

        await productsRepository.save(product);
        return product;
    }
}

export default UpdateProductService;

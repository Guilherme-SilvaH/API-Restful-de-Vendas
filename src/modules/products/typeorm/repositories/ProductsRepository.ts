import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";


@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
//Busca em Product o name, o criterio a ser buscado é o o name que foi passado no parametro
  public async findByName(name: string): Promise<Product | undefined>{
    const product = this.findOne({
      where: {
        name,
      }

    });
    return product;
  }
}

export default ProductRepository;

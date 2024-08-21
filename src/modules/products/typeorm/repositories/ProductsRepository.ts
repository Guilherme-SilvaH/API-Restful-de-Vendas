import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";


interface IFindProducts { 
  id: string
}


@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
//Busca em Product o name, o criterio a ser buscado é o o name que foi passado no parametro
public async findByName(name: string): Promise<Product | undefined> {
  const product = await this.findOne({
    where: {
      name,
    },
  });
  return product || undefined;
}



public async findAllByIds (products: IFindProducts[],): Promise<Product[]> {
  const productIds = products.map(product => product.id);

  const existsProdutcs = await this.find({
    where: {
      id: In(productIds)
    }
  })
  return existsProdutcs;
}
}

export default ProductRepository;

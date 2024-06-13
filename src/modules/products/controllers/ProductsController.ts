import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductsService";

export default class ProductsController {
    //controller para listar os produtos
    public async index(request: Request, response: Response): Promise<Response>{

        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return response.json(products);
    };

    //controller para mostrar produtos atraves do ID
    public async show(request: Request, response: Response): Promise<Response>{
      const { id } = request.params;

      const showProduct = new ShowProductService();

      const product = await showProduct.execute({ id });

      return response.json(product);

    };

    //controller para crear um produto
    public async create(request: Request, response: Response): Promise<Response>{
      const { name, price, quantity } = request.body

      const createProduct = new CreateProductService()

      const product = await createProduct.execute({
        name,
        price,
        quantity,
      });

      return response.json(product)

    };

    //controller para atualizar um produto
    public async update(request: Request, response: Response): Promise<Response>{
       const {name, price, quantity } = request.body
       const { id } = request.params;

       const updateProduct = new UpdateProductService();

       const product  = await updateProduct.execute({
        id,
        name,
        price,
        quantity,
       });

       return response.json(product)
    };



    //controller para deletar um produto
    public async delete(request: Request, response: Response): Promise<Response>{
      const { id } = request.params

      const deleteProduct = new DeleteProductService();

      await deleteProduct.execute({id})

      return response.json([])

    }
}

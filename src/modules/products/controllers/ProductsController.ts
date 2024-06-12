import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";

export default class ProductsController {


    //controller para listar os produtos
    public async index(request: Request, response: Response): Promise<Response>{

        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return response.json(products);
    }

    //controller para mostrar produtos atraves do ID
    public async show(request: Request, response: Response): Promise<Response>{
      const { id } = request.params;

      const showProduct = new ShowProductService();

      const product = showProduct.execute({ id });

      return response.json(product);

    }
}

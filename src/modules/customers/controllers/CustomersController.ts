import { Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";


export default class CustomersController {
    //controller para listar os produtos
    public async index(request: Request, response: Response): Promise<Response>{

        const listCustomer = new ListCustomerService();

        const customers = await listCustomer.execute();

        return response.json(customers);
    };

    //controller para mostrar produtos atraves do ID
    public async show(request: Request, response: Response): Promise<Response>{
      const { id } = request.params;

      const showCustomers = new ShowCustomerService();

      const customers = await showCustomers.execute({ id });

      return response.json(customers);

    };

    //controller para crear um produto
    public async create(request: Request, response: Response): Promise<Response>{
      const { name, email } = request.body

      const createCustomer = new CreateCustomerService()

      const Customer = await createCustomer.execute({
        name,
        email
      });

      return response.json(Customer)

    };

    //controller para atualizar um produto
    public async update(request: Request, response: Response): Promise<Response>{
       const {name, email } = request.body
       const { id } = request.params;

       const updateCustomer = new UpdateCustomerService();

       const Custumer = await updateCustomer.execute({
        id,
        name,
        email,
       });

       return response.json(Custumer)
    };



    //controller para deletar um produto
    public async delete(request: Request, response: Response): Promise<Response>{
      const { id } = request.params

      const deleteCustomer = new DeleteCustomerService();

      await deleteCustomer.execute({id})

      return response.json([])

    }
}

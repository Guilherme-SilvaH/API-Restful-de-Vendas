import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";



interface IRequest {
  id: string;
}


class DeleteCustomerService{
    public async execute({id}: IRequest): Promise<void>{
        const customersRepository = getCustomRepository(CustomersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const customer = await customersRepository.findOne(id);

        //verificars se ja existe o produco com o name passado
        if(!customer){
          throw new AppError('Customer not found')
        }

      await customersRepository.remove(customer)
    }
}

export default DeleteCustomerService;

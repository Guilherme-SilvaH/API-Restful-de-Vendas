import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IRequest {
  id: string;
  name: string;
  email: string,
}


class UpdateCustomerService{
    public async execute({ id, name, email}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository);  //Utilizamos o getCustomRepository quando ja temos um repositorio customizado, se nao, usamos o getRepository

        const customer = await customerRepository.findOne(id);

        //verificars e o id do produto esta cadastrado em nosso DB
        if(!customer){
          throw new AppError('User not found')
        }

        const customerExist = await customerRepository.findByEmail(email);

        if (customerExist && email !== customer.email) {
          throw new AppError('There is alteary one customer with this email.')
        }

        customer.name = name;
        customer.email = email;


        await customerRepository.save(customer);
        return customer;
    }
}

export default UpdateCustomerService;

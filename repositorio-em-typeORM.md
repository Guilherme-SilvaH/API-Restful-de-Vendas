## No TypeORM, um repositório (repository) é uma classe ou um serviço que fornece uma interface para realizar operações de CRUD (Create, Read, Update, Delete) em uma entidade específica. Os repositórios abstraem a lógica de acesso a dados, permitindo que você interaja com o banco de dados de maneira mais estruturada e organizada.

**Utilizando Repositórios no TypeORM**

## Obtendo um Repositório

    --Para obter um repositório para uma entidade específica, você pode usar o método getRepository do DataSource ou do EntityManager. Aqui está um exemplo básico:


    ```
    import { AppDataSource } from './data-source'; // Supondo que você tenha configurado o DataSource
    import { User } from './entity/User';

    // Obtendo o repositório da entidade User
    const userRepository = AppDataSource.getRepository(User);


    ```

**Operações Comuns com Repositórios**

## Uma vez que você tenha o repositório de uma entidade, você pode usar vários métodos para realizar operações de CRUD. Aqui estão alguns dos métodos mais comuns:

    -- Salvar uma Entidade: Insere ou atualiza uma entidade no banco de dados.

```
  const user = new User();
  user.firstName = 'John';
  user.lastName = 'Doe';
  user.age = 25;
  await userRepository.save(user);

```

## Encontrar Entidades: Recupera entidades do banco de dados.

```
  const users = await userRepository.find();
  const user = await userRepository.findOneBy({ id: 1 });

```

## Atualizar uma Entidade: Atualiza propriedades específicas de uma entidade.

```
await userRepository.update(1, { firstName: 'Jane' });

```

## Remover uma Entidade: Remove uma entidade do banco de dados.

```
await userRepository.remove(user);

```

## Customizando Repositórios

**Você também pode criar repositórios personalizados para encapsular lógica de negócios mais complexa. Para isso, você pode estender a classe Repository do TypeORM:**

```
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByName(firstName: string, lastName: string): Promise<User[]> {
        return this.find({ where: { firstName, lastName } });
    }
}

```

## Uso Avançado: QueryBuilder

**Para consultas mais complexas, você pode usar o QueryBuilder, que oferece uma API fluente para construir consultas SQL dinamicamente:**

```
const users = await userRepository.createQueryBuilder('user')
    .where('user.age > :age', { age: 18 })
    .orderBy('user.firstName', 'ASC')
    .getMany();

```

## Resumo

**Os repositórios no TypeORM são uma forma estruturada de gerenciar operações de banco de dados para suas entidades. Eles fornecem métodos prontos para operações de CRUD, bem como a flexibilidade de definir métodos personalizados e realizar consultas complexas. Isso permite que você mantenha a lógica de acesso a dados separada da lógica de negócios, promovendo um código mais limpo e manutenível.**

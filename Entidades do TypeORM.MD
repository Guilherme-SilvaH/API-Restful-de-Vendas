# O que é Entidade?

No TypeORM, um Entity (ou Entidade) é uma classe que mapeia uma tabela no banco de dados. Cada instância de uma entidade representa uma linha da tabela. Entidades são a base do ORM (Object-Relational Mapping) do TypeORM, permitindo que você trabalhe com dados de maneira orientada a objetos, em vez de lidar diretamente com SQL.

- **Entity é uma classe que mapeia para uma tabela de banco de dados (ou coleção ao usar o MongoDB). Você pode criar uma entidade definindo uma nova classe e marcá-la com:@Entity()**

- **Definindo uma Entidade**
  Para definir uma entidade no TypeORM, você usa o decorator @Entity() para marcar uma classe como uma entidade de banco de dados. Dentro dessa classe, você define propriedades que correspondem às colunas da tabela. Cada propriedade é decorada com o decorator @Column() para indicar que ela é uma coluna da tabela.

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

```
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}

Isso criará a seguinte tabela de banco de dados:

+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| firstName   | varchar(255) |                            |
| lastName    | varchar(255) |                            |
| isActive    | boolean      |                            |
+-------------+--------------+----------------------------+

```

# As entidades básicas consistem em colunas e relações. Cada entidade DEVE ter uma coluna primária (ou coluna ObjectId, se estiver usando o MongoDB).

    --Cada entidade deve ser registrada em suas opções de fonte de dados:

```
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: [User],
})
```

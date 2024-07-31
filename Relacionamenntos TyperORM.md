# AVANÇANDO COM TYPEORM

No TypeORM, um ORM (Object-Relational Mapping) para TypeScript e JavaScript, os relacionamentos são usados para definir as conexões entre entidades (classes que representam tabelas do banco de dados). Existem três tipos principais de relacionamentos no TypeORM: One-to-One (um-para-um), One-to-Many/Many-to-One (um-para-muitos/muitos-para-um) e Many-to-Many (muitos-para-muitos). Vou explicar cada um deles:

1. One-to-One (Um-para-um)
Um relacionamento one-to-one é quando uma entidade A está associada a uma entidade B, e vice-versa. Em outras palavras, cada instância de A está associada a uma única instância de B, e cada instância de B está associada a uma única instância de A.

Exemplo:
typescript
Copy code
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bio: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;
}
2. One-to-Many / Many-to-One (Um-para-muitos / Muitos-para-um)
Um relacionamento one-to-many é quando uma entidade A está associada a muitas instâncias da entidade B, mas cada instância da entidade B está associada a uma única instância da entidade A. O relacionamento many-to-one é a direção inversa do relacionamento one-to-many.

Exemplo:
typescript
Copy code
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
3. Many-to-Many (Muitos-para-muitos)
Um relacionamento many-to-many é quando múltiplas instâncias da entidade A estão associadas a múltiplas instâncias da entidade B, e vice-versa.

Exemplo:
typescript
Copy code
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Post, post => post.categories)
    @JoinTable()
    posts: Post[];
}

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => Category, category => category.posts)
    categories: Category[];
}


Resumo das Anotações Utilizadas:
@OneToOne: Define um relacionamento um-para-um entre duas entidades.
@OneToMany: Define um relacionamento um-para-muitos entre duas entidades.
@ManyToOne: Define um relacionamento muitos-para-um entre duas entidades.
@ManyToMany: Define um relacionamento muitos-para-muitos entre duas entidades.
@JoinColumn: Usado em relacionamentos um-para-um e muitos-para-um para indicar que esta entidade possui a chave estrangeira.
@JoinTable: Usado em relacionamentos muitos-para-muitos para definir a tabela intermediária que armazena as chaves estrangeiras das duas entidades.
Esses conceitos permitem modelar relacionamentos complexos entre entidades e ajudam a manter a integridade referencial no banco de dados.

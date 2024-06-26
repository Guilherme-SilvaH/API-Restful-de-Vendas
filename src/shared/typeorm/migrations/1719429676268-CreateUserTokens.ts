import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1719429676268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users_tokens',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'token',
              type: 'uuid',
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },

            {
              name: 'user_id',
              type: 'uuid'
            },
            {
              name: "created_at",
              type: "timestamp with time zone",
              default: "now()",
              isNullable: false,
            },
            {
              name: "updated_at",
              type: "timestamp with time zone",
              default: "now()",
              isNullable: false,
            },
          ],
          foreignKeys: [
            {
              name: 'TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users_tokens')
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1753442991610 implements MigrationInterface {
  name = 'CreateUserTable1753442991610'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user_entity"
        `)
  }
}

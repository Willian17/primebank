import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientes1708474108645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "clientes" (
                "id" varchar(60) NOT NULL,
                "nome" varchar(120) NOT NULL,
                "cpf" varchar(11)  NOT NULL UNIQUE,
                CONSTRAINT "PK_idcliente" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "clientes" DROP CONSTRAINT IF EXISTS "PK_idcliente"
    `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS "clientes"
        `);
  }
}

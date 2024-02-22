import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContasBancarias1708542414102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "contasBancarias" (
                "id" varchar(60) NOT NULL,
                "agencia" varchar(4) NOT NULL,
                "conta" varchar(8) NOT NULL,
                "banco" varchar(60) NOT NULL,
                "saldo" decimal(15,2) NOT NULL DEFAULT '0.00',
                "ativo" boolean NOT NULL DEFAULT true,
                "idCliente" varchar(60) NOT NULL,
                CONSTRAINT "PK_idconta" PRIMARY KEY ("id"),
                CONSTRAINT "FK_idcliente" FOREIGN KEY ("idCliente") REFERENCES "clientes" ("id")
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "contas_bancarias"
        `);
  }
}

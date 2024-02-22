import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransacoes1708609760870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE "tipo_transacao" AS ENUM('CREDITO', 'DEBITO');
        `);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "transacoes" (
                "id" varchar(60) NOT NULL,
                "valor" decimal(15,2) NOT NULL,
                "tipo" tipo_transacao NOT NULL,
                "data" timestamp NOT NULL,
                "saldoAnterior" decimal(15,2) NOT NULL,
                "idConta" varchar(60) NOT NULL,
                CONSTRAINT "PK_idtransacao" PRIMARY KEY ("id"),
                CONSTRAINT "FK_idconta" FOREIGN KEY ("idConta") REFERENCES "contasBancarias" ("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "transacoes" DROP CONSTRAINT IF EXISTS "FK_idconta"
    `);
    await queryRunner.query(`
        ALTER TABLE "transacoes" DROP CONSTRAINT IF EXISTS "PK_idtransacao"
    `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS "transacoes"
        `);
    await queryRunner.query(`
            DROP TYPE IF EXISTS "tipo_transacao"
        `);
  }
}

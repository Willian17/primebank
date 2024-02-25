import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesDecimalToNumeric1708880157783
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "contasBancarias" ALTER COLUMN "saldo" TYPE NUMERIC(15,2)
        `);

    await queryRunner.query(`
            ALTER TABLE "transacoes" ALTER COLUMN "valor" TYPE NUMERIC(15,2)
        `);

    await queryRunner.query(`
        ALTER TABLE "transacoes" ALTER COLUMN "saldoAnterior" TYPE NUMERIC(15,2)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "transacoes" ALTER COLUMN "saldoAnterior" TYPE DECIMAL(15,2)
        `);

    await queryRunner.query(`
            ALTER TABLE "transacoes" ALTER COLUMN "valor" TYPE DECIMAL(15,2)
        `);

    await queryRunner.query(`
            ALTER TABLE "contasBancarias" ALTER COLUMN "saldo" TYPE DECIMAL(15,2)
        `);
  }
}

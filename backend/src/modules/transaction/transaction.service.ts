import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { BankAccountService } from '../bank-account/bank-account.service';
import { TypeTransactionEnum } from './enuns/TypeTransactionEnum';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @Inject(forwardRef(() => BankAccountService))
    private bankAccountService: BankAccountService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const bankAccount = await this.bankAccountService.findOneAgenciaConta(
      createTransactionDto.agencia,
      createTransactionDto.conta,
    );

    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não existe');
    }

    if (!bankAccount.ativo) {
      throw new BadRequestException('Conta bancária não ativa');
    }

    const transaction = this.transactionRepository.create({
      valor: createTransactionDto.valor,
      tipo: createTransactionDto.tipo,
      data: new Date(), // refactor
      saldoAnterior: bankAccount.saldo,
      idConta: bankAccount.id,
    });

    await this.transactionRepository.save(transaction);

    bankAccount.saldo =
      createTransactionDto.tipo === TypeTransactionEnum.CREDITO
        ? bankAccount.saldo + createTransactionDto.valor
        : bankAccount.saldo - createTransactionDto.valor;

    await this.bankAccountService.updateSaldo(
      bankAccount.id,
      bankAccount.saldo,
    );

    return transaction;
  }

  async findAllByBankAccount(id: string) {
    return await this.transactionRepository.find({
      where: {
        idConta: id,
      },
    });
  }

  async reportExtract(
    agencia: string,
    conta: string,
    dataStart: string,
    dataEnd: string,
  ) {
    const bankAccount = await this.bankAccountService.findOneAgenciaConta(
      agencia,
      conta,
    );

    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não existe');
    }

    if (!dataStart || !dataEnd) {
      return await this.transactionRepository.query(
        `SELECT
          transacoes.id as id,
          valor,
          tipo,
          data,
          clientes.nome as "nomeCliente",
          "saldoAnterior"
        FROM
          transacoes
        INNER JOIN
          clientes ON clientes.id = '${bankAccount.idCliente}'
        WHERE
          "idConta" = '${bankAccount.id}'
        AND
          "data" >= CURRENT_TIMESTAMP - INTERVAL '30 days' AND "data" <= CURRENT_TIMESTAMP;`,
      );
    }

    dataStart = dataStart.concat(' 00:00:00');
    dataEnd = dataEnd.concat(' 23:59:59');

    return await this.transactionRepository.query(
      `SELECT
        transacoes.id as id,
        valor,
        tipo,
        data,
        clientes.nome as "nomeCliente",
        "saldoAnterior"
      FROM
        transacoes
      INNER JOIN
        clientes ON clientes.id = '${bankAccount.idCliente}'
      WHERE
        "idConta" = '${bankAccount.id}'
      AND
        data BETWEEN '${dataStart}' AND '${dataEnd}';`,
    );
  }
}

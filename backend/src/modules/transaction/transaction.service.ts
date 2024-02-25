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
}

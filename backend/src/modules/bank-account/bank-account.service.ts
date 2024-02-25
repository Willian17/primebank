import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../client/clients.service';
import { TransactionService } from '../transaction/transaction.service';
import { UpdateStatusBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,

    private clientService: ClientsService,
    private transactionService: TransactionService,
  ) {}
  async create(createBankAccountDto: CreateBankAccountDto) {
    let client = await this.clientService.findCpf(
      createBankAccountDto.cpfCliente,
    );

    if (!client) {
      client = await this.clientService.create({
        nome: createBankAccountDto.nomeCliente,
        cpf: createBankAccountDto.cpfCliente,
      });
    }

    const bankAccountExists = await this.bankAccountRepository.findOne({
      where: {
        agencia: createBankAccountDto.agencia,
        conta: createBankAccountDto.conta,
        banco: createBankAccountDto.banco,
      },
    });

    if (bankAccountExists) {
      throw new BadRequestException('Conta bancária já existe');
    }

    const newBankAccount = this.bankAccountRepository.create({
      agencia: createBankAccountDto.agencia,
      conta: createBankAccountDto.conta,
      ativo: true,
      banco: createBankAccountDto.banco,
      saldo: createBankAccountDto.saldo || 0,
      idCliente: client.id,
    });
    return await this.bankAccountRepository.save(newBankAccount);
  }

  async findAll() {
    return await this.bankAccountRepository.find({
      relations: ['cliente', 'transacoes'],
    });
  }

  async updateStatus(
    id: string,
    updateStatusBankAccountDto: UpdateStatusBankAccountDto,
  ) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: {
        id,
      },
    });
    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não existe');
    }

    return await this.bankAccountRepository.update(id, {
      ativo: updateStatusBankAccountDto.ativo,
    });
  }

  async remove(id: string) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: {
        id,
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não existe');
    }

    const transactions = await this.transactionService.findAllByBankAccount(
      bankAccount.id,
    );

    if (transactions.length) {
      throw new BadRequestException(
        'Conta bancária possui transações e não pode ser excluída',
      );
    }

    await this.bankAccountRepository.delete(id);
  }
}

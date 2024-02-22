import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,

    private clientService: ClientsService,
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
      relations: ['cliente'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}

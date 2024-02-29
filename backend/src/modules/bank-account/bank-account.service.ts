import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../client/clients.service';
import { TransactionService } from '../transaction/transaction.service';
import { UpdateStatusBankAccountDto } from './dto/update-bank-account.dto';
import { ReportDBDto } from './dto/report-db-dto';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,

    private clientService: ClientsService,

    @Inject(forwardRef(() => TransactionService))
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

  async findOneAgenciaConta(agencia: string, conta: string) {
    return await this.bankAccountRepository.findOne({
      where: {
        agencia,
        conta,
      },
    });
  }

  async updateSaldo(id: string, saldo: number) {
    return await this.bankAccountRepository.update({ id }, { saldo });
  }

  async findAllReportConsolidated(groupedBy: string) {
    const reportData: ReportDBDto[] = await this.bankAccountRepository.query(
      `SELECT  
      clientes.nome  as "nomeCliente",
      banco,
      agencia, 
      conta,
      SUM(transacoes.valor) FILTER (WHERE transacoes.tipo = 'DEBITO') AS "totalDebito",
      SUM(transacoes.valor) FILTER (WHERE transacoes.tipo = 'CREDITO') AS "totalCredito",
      saldo as "saldoFinal",
        (
            SELECT "saldoAnterior"
            FROM transacoes
            WHERE "idConta" = contas.id
            ORDER BY "data" ASC
            LIMIT 1
        ) AS "saldoAnterior" 
    FROM "contasBancarias" contas
    INNER JOIN
      clientes on clientes.id = contas."idCliente"
    LEFT JOIN 
      "transacoes" ON transacoes."idConta" = contas.id
    GROUP BY clientes.nome, banco, agencia, conta, contas.saldo, contas.id;`,
    );

    const groupedReport = Object.values(
      reportData.reduce((reports, bankAccount) => {
        let key;
        let filterCallback;
        switch (groupedBy.toUpperCase()) {
          case 'BANCO':
            key = bankAccount.banco;
            filterCallback = (item: ReportDBDto) =>
              item.banco === bankAccount.banco;
            break;
          case 'CONTA':
            key = bankAccount.conta;
            filterCallback = (item: ReportDBDto) =>
              item.conta === bankAccount.conta;
            break;
          case 'CLIENTE':
            key = bankAccount.nomeCliente;
            filterCallback = (item: ReportDBDto) =>
              item.nomeCliente === bankAccount.nomeCliente;
            break;
          default:
            key = bankAccount.banco;
            filterCallback = (item: ReportDBDto) =>
              item.banco === bankAccount.banco;
        }

        if (!reports[key]) {
          const saldoAnterior = reportData
            .filter(filterCallback)
            .reduce((total, item) => +total + +item.saldoAnterior, 0);

          const totalDebito = reportData
            .filter(filterCallback)
            .reduce((total, item) => +total + +item.totalDebito, 0);

          const totalCredito = reportData
            .filter(filterCallback)
            .reduce((total, item) => +total + +item.totalCredito, 0);

          const saldoFinal = reportData
            .filter(filterCallback)
            .reduce((total, item) => +total + +item.saldoFinal, 0);

          reports[key] = {
            name: key,
            totalDebito,
            totalCredito,
            saldoFinal,
            saldoAnterior,
            contasBancarias: [],
          };
        }

        reports[key].contasBancarias.push({
          nomeCliente: bankAccount.nomeCliente,
          banco: bankAccount.banco,
          conta: bankAccount.conta,
          totalDebito: +bankAccount.totalDebito || 0,
          totalCredito: +bankAccount.totalCredito || 0,
          saldoFinal: +bankAccount.saldoFinal || 0,
          saldoAnterior:
            bankAccount.saldoAnterior == null
              ? +bankAccount.saldoFinal
              : +bankAccount.saldoAnterior,
        });
        return reports;
      }, {}),
    );

    return groupedReport;
  }
}

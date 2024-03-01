import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get('extract/:agencia/:conta')
  async reportExtract(
    @Param('agencia') agencia: string,
    @Param('conta') conta: string,
    @Query('dataInicial') dataStart: string,
    @Query('dataFinal') dataEnd: string,
  ) {
    return await this.transactionService.reportExtract(
      agencia,
      conta,
      dataStart,
      dataEnd,
    );
  }
}

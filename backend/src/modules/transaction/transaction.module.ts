import { Module, forwardRef } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { BankAccountModule } from '../bank-account/bank-account.module';

@Module({
  controllers: [TransactionController],
  imports: [
    forwardRef(() => BankAccountModule),
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}

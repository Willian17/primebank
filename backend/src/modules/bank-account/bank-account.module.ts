import { Module, forwardRef } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { ClientsModule } from '../client/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  controllers: [BankAccountController],
  providers: [BankAccountService],
  imports: [
    ClientsModule,
    forwardRef(() => TransactionModule),
    TypeOrmModule.forFeature([BankAccount]),
  ],
  exports: [BankAccountService],
})
export class BankAccountModule {}

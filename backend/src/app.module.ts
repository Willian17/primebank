import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/client/clients.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionModule } from './modules/transaction/transaction.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule,
    BankAccountModule,
    TransactionModule,
  ],
  controllers: [],
})
export class AppModule {}

import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TypeTransactionEnum } from '../enuns/TypeTransactionEnum';
import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';

@Entity('transacoes')
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  valor: number;

  @Column({
    type: 'enum',
    enum: TypeTransactionEnum,
  })
  tipo: TypeTransactionEnum;

  @Column()
  data: Date;

  @Column()
  saldoAnterior: number;

  @Column({ foreignKeyConstraintName: 'FK_idconta', select: false })
  idConta: string;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transacoes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idConta' })
  conta: BankAccount;

  @BeforeInsert()
  default() {
    this.id = uuidv4();
  }
}

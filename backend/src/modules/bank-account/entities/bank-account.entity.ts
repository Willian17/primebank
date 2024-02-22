import { Client } from 'src/modules/client/entities/client.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity('contasBancarias')
export class BankAccount {
  @PrimaryColumn()
  id: string;

  @Column()
  agencia: string;

  @Column()
  conta: string;

  @Column()
  banco: string;

  @Column()
  saldo: number;

  @Column()
  ativo: boolean;

  @Column({ foreignKeyConstraintName: 'FK_idcliente', select: false })
  idCliente: string;

  @ManyToOne(() => Client, (client) => client.bankAccounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idCliente' })
  cliente: Client;

  @OneToMany(() => Transaction, (transactions) => transactions.conta)
  transacoes: Transaction[];

  @BeforeInsert()
  default() {
    this.id = uuidv4();
  }
}

import { Client } from 'src/modules/clients/entities/client.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contasBancarias')
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
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
}

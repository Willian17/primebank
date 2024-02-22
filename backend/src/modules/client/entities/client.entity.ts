import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'clientes' })
export class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column({ select: false })
  cpf: string;

  @OneToMany(() => BankAccount, (bankAccounts) => bankAccounts.cliente)
  bankAccounts: BankAccount[];

  @BeforeInsert()
  default() {
    this.id = uuidv4();
  }
}

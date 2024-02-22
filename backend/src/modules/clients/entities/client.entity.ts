import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ select: false })
  cpf: string;

  @OneToMany(() => BankAccount, (bankAccounts) => bankAccounts.cliente)
  bankAccounts: BankAccount[];
}

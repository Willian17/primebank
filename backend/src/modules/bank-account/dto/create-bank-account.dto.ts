import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  Min,
  maxLength,
} from 'class-validator';

export class CreateBankAccountDto {
  @IsNotEmpty({ message: 'Agencia não pode ser vazio' })
  @Length(4, 4, { message: 'Agencia precisa ter 4 digitos' })
  agencia: string;

  @IsNotEmpty({ message: 'Conta não pode ser vazio' })
  @Length(9, 9, { message: 'Conta precisa ter 9 digitos' })
  conta: string;

  @IsNotEmpty({ message: 'Banco não pode ser vazio' })
  banco: string;

  @IsNotEmpty({ message: 'Saldo não pode ser vazio' })
  @IsNumber({}, { message: 'Saldo precisa ser um numero' })
  @Min(0, { message: 'Saldo precisa ser positivo' })
  saldo?: number;

  @IsNotEmpty({ message: 'CPF do cliente não pode ser vazio' })
  cpfCliente: string;

  @IsNotEmpty({ message: 'Nome do cliente não pode ser vazio' })
  nomeCliente: string;
}

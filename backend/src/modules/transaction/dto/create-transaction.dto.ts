import { IsEnum, IsNotEmpty, IsNumber, Length, Min } from 'class-validator';
import { TypeTransactionEnum } from '../enuns/TypeTransactionEnum';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'Agencia não pode ser vazio' })
  @Length(3, 4, { message: 'Agencia tem que estar entre 3-4 digitos' })
  agencia: string;

  @IsNotEmpty({ message: 'Conta não pode ser vazio' })
  @Length(8, 8, { message: 'Conta precisa ter 8 digitos' })
  conta: string;

  @IsNotEmpty({ message: 'Tipo de transação não pode ser vazio' })
  @IsEnum(TypeTransactionEnum, {
    message: 'Tipo de transação inválido',
  })
  tipo: TypeTransactionEnum;

  @IsNotEmpty({ message: 'Valor não pode ser vazio' })
  @IsNumber({}, { message: 'Valor precisa ser um numero' })
  @Min(0, { message: 'Valor precisa ser positivo' })
  valor: number;
}

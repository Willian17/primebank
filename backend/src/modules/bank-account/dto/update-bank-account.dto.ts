import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateStatusBankAccountDto {
  @IsNotEmpty({ message: 'O campo ativo não pode ser vazio.' })
  @IsBoolean({ message: 'O campo ativo deve ser um valor booleano.' })
  ativo: boolean;
}

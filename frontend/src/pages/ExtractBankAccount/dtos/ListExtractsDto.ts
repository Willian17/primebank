import { TypeTransactionEnum } from "../../Transaction/enum/TypeTransactionEnum";

export interface ListExtractsDto {
  id: string;
  nomeCliente: string;
  valor: number;
  tipo: TypeTransactionEnum;
  data: string;
  saldoAnterior: number;
}

export interface ReportConsolidatedDto {
  name: string;
  saldoAnterior: number;
  totalDebito: number;
  totalCredito: number;
  saldoFinal: number;
  contasBancarias: BankAccountDto[];
}

interface BankAccountDto {
  nomeCliente: string;
  banco: string;
  conta: string;
  totalDebito: number;
  totalCredito: number;
  saldoFinal: number;
  saldoAnterior: number;
}

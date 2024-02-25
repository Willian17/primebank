export default interface BankAccountListDto {
  id: string;
  agencia: string;
  conta: string;
  banco: string;
  saldo: number;
  ativo: boolean;
  cliente: {
    id: string;
    nome: string;
  };
  transacoes: transacao[];
}

interface transacao {
  id: string;
  valor: number;
  tipo: string;
  data: Date;
  saldoAnterior: number;
}

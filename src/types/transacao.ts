export interface Transacao {
  id: string;
  titulo: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
  formaPagamento: string;
}

export type NovaTransacaoInput = Omit<Transacao, 'id' | 'data'>;
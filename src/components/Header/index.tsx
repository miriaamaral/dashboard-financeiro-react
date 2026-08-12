import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransacoes } from '../../hooks/useTransacoes';
import './Header.css';

export function Header() {
  // Chamamos nosso Hook! O React vai buscar os dados e nos entregar aqui.
  const { transacoes, carregando } = useTransacoes();

  // Reducer: Uma função nativa do JS/TS excelente para somar arrays.
  // Estamos filtrando as transações e somando apenas as "receitas".
  const totalReceitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  // Somando apenas as "despesas".
  const totalDespesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  // O Saldo é a matemática básica!
  const saldoAtual = totalReceitas - totalDespesas;

  // Função auxiliar para formatar números para o padrão BRL (R$)
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        
        {/* Saudação à Persona (UX Amigável) */}
        <div className="user-greeting">
          <h1>Olá, Marina! 👋</h1>
          <p>Aqui está o resumo do seu mês até agora.</p>
        </div>

        {/* Cards de Resumo */}
        <div className="summary-cards">
          
          {/* Card: Saldo Atual */}
          <article className="card card-total">
            <header>
              <span>Saldo Atual</span>
              <Wallet className="icon" size={24} />
            </header>
            <strong>
              {carregando ? 'Carregando...' : formatarMoeda(saldoAtual)}
            </strong>
          </article>

          {/* Card: Entradas */}
          <article className="card card-income">
            <header>
              <span>Entradas (Salário + Vales)</span>
              <TrendingUp className="icon icon-green" size={24} />
            </header>
            <strong>
              {carregando ? 'Carregando...' : formatarMoeda(totalReceitas)}
            </strong>
          </article>

          {/* Card: Saídas */}
          <article className="card card-expense">
            <header>
              <span>Saídas (Gastos Fixos + Variáveis)</span>
              <TrendingDown className="icon icon-red" size={24} />
            </header>
            <strong>
              {carregando ? 'Carregando...' : formatarMoeda(totalDespesas)}
            </strong>
          </article>

        </div>
      </div>
    </header>
  );
}
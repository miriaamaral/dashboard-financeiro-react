import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { useTransacoes } from '../../hooks/useTransacoes';
import './Header.css';

// Declaramos que o Header vai receber a função de abrir o Modal como Propriedade
interface HeaderProps {
  aoAbrirModal: () => void;
}

export function Header({ aoAbrirModal }: HeaderProps) {
  // Chamamos nosso Hook! O React vai buscar os dados e nos entregar aqui.
  const { transacoes, carregando } = useTransacoes();

  // Filtrando e somando apenas as "receitas"
  const totalReceitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  // Filtrando e somando apenas as "despesas"
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
        
        {/* Top Bar: Saudação + Botão de Nova Transação */}
        <div className="header-top-bar">
          <div className="user-greeting">
            <h1>Olá, Marina! 👋</h1>
            <p>Aqui está o resumo do seu mês até agora.</p>
          </div>
          
          <button className="new-transaction-btn" onClick={aoAbrirModal}>
            <Plus size={20} />
            Nova Transação
          </button>
        </div>

        {/* Cards de Resumo */}
        <div className="summary-cards">
          
          <article className="card card-total">
            <header>
              <span>Saldo Atual</span>
              <div className="icon-badge-total">
                <Wallet size={24} />
              </div>
            </header>
            <strong>{carregando ? 'Carregando...' : formatarMoeda(saldoAtual)}</strong>
          </article>

          <article className="card card-income">
            <header>
              <span>Entradas (Salário + Vales)</span>
              <div className="icon-badge-green">
                <TrendingUp size={24} />
              </div>
            </header>
            <strong>{carregando ? 'Carregando...' : formatarMoeda(totalReceitas)}</strong>
          </article>

          <article className="card card-expense">
            <header>
              <span>Saídas (Gastos Fixos + Variáveis)</span>
              <div className="icon-badge-red">
                <TrendingDown size={24} />
              </div>
            </header>
            <strong>{carregando ? 'Carregando...' : formatarMoeda(totalDespesas)}</strong>
          </article>

        </div>
      </div>
    </header>
  );
}
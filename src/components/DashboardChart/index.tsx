import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTransacoes } from '../../hooks/useTransacoes';
import { type Transacao } from '../../types/transacao';
import './DashboardChart.css';

export function DashboardChart() {
  const { transacoes, carregando } = useTransacoes();

  // 1. Precisamos transformar a nossa lista de transações cruas num formato 
  // que o Recharts entenda (agrupando receitas e despesas por dia).
  const dadosDoGrafico = transformarDadosParaGrafico(transacoes);

  if (carregando) {
    return (
      <section className="chart-container skeleton-loading">
        <p>Carregando seu panorama financeiro...</p>
      </section>
    );
  }

  return (
    <section className="chart-container">
      <header className="chart-header">
        <h2>Evolução Financeira (Agosto/2026)</h2>
        <p>Acompanhe suas entradas e saídas ao longo do mês</p>
      </header>

      {/* O ResponsiveContainer garante que o gráfico se adapte ao celular ou desktop */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dadosDoGrafico}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Linhas de fundo sutis para não poluir a tela */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            
            {/* Eixo X (Dias do mês) */}
            <XAxis 
              dataKey="dia" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }} 
              dy={10}
            />
            
            {/* Eixo Y (Valores em R$) */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickFormatter={(value) => `R$ ${value}`}
            />
            
            {/* O balãozinho que aparece quando passa o mouse por cima */}
            <Tooltip content={<CustomTooltip />} />

            {/* A montanha de Receitas (Verde Acolhedor) */}
            <Area
              type="monotone"
              name="Entradas"
              dataKey="receita"
              stroke="var(--color-income)"
              fillOpacity={1}
              fill="url(#colorReceita)"
              strokeWidth={2}
            />
            
            {/* A montanha de Despesas (Coral Suave) */}
            <Area
              type="monotone"
              name="Saídas"
              dataKey="despesa"
              stroke="var(--color-expense)"
              fillOpacity={1}
              fill="url(#colorDespesa)"
              strokeWidth={2}
            />

            {/* Definindo os gradientes para preencher as "montanhas" */}
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

// =========================================================================
// FUNÇÕES AUXILIARES E COMPONENTES MENORES
// =========================================================================

// Agora o TS sabe que 'transacoes' não é 'any[]', é 'Transacao[]'!
function transformarDadosParaGrafico(transacoes: Transacao[]) {
  const agrupadoPorDia = transacoes.reduce((acc, transacao) => {
    const dataObj = new Date(transacao.data);
    const diaFormatado = `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth() + 1).toString().padStart(2, '0')}`;

    if (!acc[diaFormatado]) {
      acc[diaFormatado] = { dia: diaFormatado, receita: 0, despesa: 0 };
    }

    if (transacao.tipo === 'receita') {
      acc[diaFormatado].receita += transacao.valor;
    } else {
      acc[diaFormatado].despesa += transacao.valor;
    }

    return acc;
  }, {} as Record<string, { dia: string; receita: number; despesa: number }>);

  return Object.values(agrupadoPorDia).sort((a, b) => {
    const [diaA] = a.dia.split('/');
    const [diaB] = b.dia.split('/');
    return Number(diaA) - Number(diaB);
  });
}

// Tipando o payload do Recharts corretamente para evitar o "any"
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">Dia {label}</p>
        {payload.map((item, index) => (
          <p key={index} className="tooltip-value" style={{ color: item.color }}>
            {item.name}: <strong>R$ {item.value.toFixed(2)}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
import { useState, type FormEvent } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { useTransacoes } from '../../hooks/useTransacoes';
import './NovaTransacaoModal.css';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NovaTransacaoModal({ isOpen, onRequestClose }: ModalProps) {
  const { criarTransacao } = useTransacoes();

  /* Estados locais para controlar o que o utilizador digita no formulário */
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa');

  /* Se o modal não estiver aberto, não renderiza nada */
  if (!isOpen) return null;

  /* Função disparada ao submeter o formulário */
  async function handleCriarNovaTransacao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); /* Evita que a página recarregue */

    await criarTransacao({
      titulo,
      valor,
      categoria,
      formaPagamento,
      tipo,
    });

    /* Limpa os campos após salvar */
    setTitulo('');
    setValor(0);
    setCategoria('');
    setFormaPagamento('');
    setTipo('despesa');
    
    /* Fecha o modal */
    onRequestClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" onClick={onRequestClose} className="modal-close">
          <X size={24} />
        </button>

        <form onSubmit={handleCriarNovaTransacao}>
          <h2>Registar Nova Transação</h2>

          <input
            placeholder="Título (ex: Uber, Mercado, shopee...)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Valor (ex: 100.00)"
            value={valor || ''}
            onChange={(e) => setValor(Number(e.target.value))}
            required
          />

          <div className="transaction-type-container">
            <button
              type="button"
              className={`type-button ${tipo === 'receita' ? 'active-income' : ''}`}
              onClick={() => setTipo('receita')}
            >
              Entrada
            </button>
            <button
              type="button"
              className={`type-button ${tipo === 'despesa' ? 'active-expense' : ''}`}
              onClick={() => setTipo('despesa')}
            >
              Saída
            </button>
          </div>

          <input
            placeholder="Categoria (ex: Alimentação)"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />

          <input
            placeholder="Forma de Pagamento (ex: PIX, Crédito)"
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            required
          />

          <button type="submit" className="submit-button">
            <ArrowRightLeft size={20} />
            Registar Transação
          </button>
        </form>
      </div>
    </div>
  );
}
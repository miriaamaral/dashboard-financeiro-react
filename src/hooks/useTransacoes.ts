import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Transacao, NovaTransacaoInput } from '../types/transacao';

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarTransacoes() {
      try {
        setCarregando(true);
        const response = await api.get<Transacao[]>('/transacoes');
        setTransacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
        setErro("Não foi possível carregar as transações.");
      } finally {
        setCarregando(false);
      }
    }

    buscarTransacoes(); 
  }, []);

  async function criarTransacao(transacaoInput: NovaTransacaoInput) {
    try {
      const novaTransacao = {
        ...transacaoInput,
        data: new Date().toISOString()
      };
      const response = await api.post('/transacoes', novaTransacao);
      setTransacoes([...transacoes, response.data]);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      alert("Erro ao registar a transação. Tente novamente.");
    }
  }

  return {
    transacoes,
    carregando,
    erro,
    criarTransacao
  };
}
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { type Transacao } from '../types/transacao';

export function useTransacoes() {
  // useState: É como declarar uma variável no Controller do Angular, mas no React precisamos 
  // do 'setTransacoes' para avisar a tela que o valor mudou e forçar a re-renderização.
  // Começamos com um array vazio de Transacao.
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  
  // Estados auxiliares para feedback visual (Acessibilidade/UX)
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // useEffect: É o equivalente ao ngOnInit() do Angular. 
  // Ele roda assim que o componente que chamar este hook aparecer na tela.
  useEffect(() => {
    buscarTransacoes();
  }, []); // O array vazio [] significa "Rode apenas UMA VEZ na montagem"

  // A nossa função de requisição (Comunicação Client x Server)
  async function buscarTransacoes() {
    try {
      setCarregando(true);
      // Aqui o Axios vai lá no nosso http://localhost:3333/transacoes
      const response = await api.get<Transacao[]>('/transacoes');
      
      // Salva os dados recebidos no estado
      setTransacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setErro("Não foi possível carregar as transações. Verifique sua conexão.");
    } finally {
      // Independentemente de dar certo ou erro, o carregamento terminou
      setCarregando(false);
    }
  }

  // O Hook retorna tudo o que a interface vai precisar
  return {
    transacoes,
    carregando,
    erro,
    recarregarDados: buscarTransacoes // Exportamos para caso precisemos atualizar a lista depois de criar uma nova despesa
  };
}
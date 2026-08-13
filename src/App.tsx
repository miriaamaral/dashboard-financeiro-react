import { useState } from 'react';
import { Header } from './components/Header';
import { DashboardChart } from './components/DashboardChart';
import { NovaTransacaoModal } from './components/NovaTransacaoModal';
import './App.css';

function App() {
  // Estado que controla se o Modal de criar despesa está visível ou não
  const [isModalAberto, setIsModalAberto] = useState(false);

  return (
    <>
      {/* Passamos a função de abrir o modal para o Header (onde o botão vive) */}
      <Header aoAbrirModal={() => setIsModalAberto(true)} />
      
      <main className="main-content">
        <DashboardChart />
      </main>

      {/* Renderizamos o Modal passando o estado e a função de fechar */}
      <NovaTransacaoModal 
        isOpen={isModalAberto} 
        onRequestClose={() => setIsModalAberto(false)} 
      />
    </>
  );
}

export default App;
import { Header } from './components/Header';
import { DashboardChart } from './components/DashboardChart';
import './App.css';

function App() {
  return (
    <>
      <Header />
      {/* Esta div limita a largura centralizando o conteúdo no desktop */}
      <main className="main-content">
        <DashboardChart />
      </main>
    </>
  );
}

export default App;
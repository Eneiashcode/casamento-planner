import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Planejamento from './pages/Planejamento';
import Convidados from './pages/Convidados';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Topo com logo e menu hamburguer */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-700">Casamento Planner</h1>
          <button
            className="text-purple-700 text-2xl md:hidden"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ☰
          </button>

            <nav
              className={`absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 flex flex-col items-start space-y-2 transition-all duration-300 z-10 ${
                menuAberto ? 'flex' : 'hidden'
              } md:hidden`}
            >
            <Link to="/" onClick={() => setMenuAberto(false)}>🏠 Início</Link>
            <Link to="/planejamento" onClick={() => setMenuAberto(false)}>📋 Planejamento</Link>
            <Link to="/convidados" onClick={() => setMenuAberto(false)}>👥 Convidados</Link>
          </nav>

          {/* Menu fixo (desktop) */}
          <nav className="hidden md:flex gap-6 text-purple-700">
            <Link to="/">🏠 Início</Link>
            <Link to="/planejamento">📋 Planejamento</Link>
            <Link to="/convidados">👥 Convidados</Link>
          </nav>
        </header>

        {/* Conteúdo da página */}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planejamento" element={<Planejamento />} />
            <Route path="/convidados" element={<Convidados />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Planejamento from './pages/Planejamento';
import Convidados from './pages/Convidados';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Menu hamburguer */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-lg font-bold text-purple-600">Casamento Planner</h1>
          <button
            className="text-purple-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </button>
        </div>

        {/* Menu lateral */}
        {menuOpen && (
          <div className="bg-white shadow-md p-4 space-y-2">
            <a href="/" className="block text-gray-700 hover:text-purple-600">🏠 Home</a>
            <a href="/planejamento" className="block text-gray-700 hover:text-purple-600">📋 Planejamento</a>
            <a href="/convidados" className="block text-gray-700 hover:text-purple-600">👥 Convidados</a>
          </div>
        )}

        {/* Conteúdo */}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planejamento" element={<Planejamento />} />
            <Route path="/convidados" element={<Convidados />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

import { useEffect, useState } from 'react';

export default function Home() {
  const [dinheiroDisponivel, setDinheiroDisponivel] = useState('');
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const valorSalvo = localStorage.getItem('dinheiroDisponivel');
    if (valorSalvo) {
      setDinheiroDisponivel(formatarValor(parseFloat(valorSalvo)));
    }

    const itensSalvos = localStorage.getItem('itensPlanejamento');
    if (itensSalvos) {
      setItens(JSON.parse(itensSalvos));
    }
  }, []);

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleChange = (e) => {
    const valorBruto = e.target.value.replace(/\D/g, '');
    const valorNumerico = parseFloat(valorBruto) / 100;
    setDinheiroDisponivel(formatarValor(valorNumerico));
    localStorage.setItem('dinheiroDisponivel', valorNumerico.toString());
  };

  const valorNumerico = parseFloat(
    dinheiroDisponivel.replace(/[R$\s.]/g, '').replace(',', '.')
  ) || 0;

  const totalEstimado = itens.reduce((acc, item) => acc + item.valorEstimado, 0);
  const totalPago = itens.reduce((acc, item) => acc + item.valorPago, 0);
  const saldoRestante = valorNumerico - totalPago;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-500">💰 Dinheiro disponível</h2>
        <input
          type="text"
          className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-lg text-green-600 font-bold focus:outline-none focus:ring focus:border-purple-500"
          value={dinheiroDisponivel}
          onChange={handleChange}
        />
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-500">🧾 Total planejado</h2>
        <p className="text-2xl font-bold text-blue-600">
          {formatarValor(totalEstimado)}
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-500">💸 Total investido</h2>
        <p className="text-2xl font-bold text-purple-600">
          {formatarValor(totalPago)}
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-500">📉 Saldo restante</h2>
        <p className="text-2xl font-bold text-red-600">
          {formatarValor(saldoRestante)}
        </p>
      </div>
    </div>
  );
}
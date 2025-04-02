import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Planejamento() {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const salvos = localStorage.getItem('itensPlanejamento');
    if (salvos) setItens(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('itensPlanejamento', JSON.stringify(itens));
  }, [itens]);

  const adicionarItem = () => {
    if (!descricao) return;

    const novo = {
      id: Date.now(),
      descricao,
      valorEstimado: parseFloat(valorEstimado) || 0,
      valorPago: parseFloat(valorPago) || 0,
    };

    setItens([...itens, novo]);
    setDescricao('');
    setValorEstimado('');
    setValorPago('');
  };

  const excluirItem = (id) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold text-purple-600">Adicionar Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Descrição"
            className="border rounded px-3 py-2"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor estimado"
            className="border rounded px-3 py-2"
            value={valorEstimado}
            onChange={(e) => setValorEstimado(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor pago"
            className="border rounded px-3 py-2"
            value={valorPago}
            onChange={(e) => setValorPago(e.target.value)}
          />
        </div>
        <button
          onClick={adicionarItem}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Adicionar
        </button>
      </div>

      <div className="space-y-2">
        {itens.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4">
            <p className="font-semibold">{item.descricao}</p>
            <p className="text-sm text-gray-600">
              Estimado: R$ {item.valorEstimado.toFixed(2).replace('.', ',')} | Pago: R$ {item.valorPago.toFixed(2).replace('.', ',')}
            </p>
            <button
              onClick={() => excluirItem(item.id)}
              className="text-sm text-red-600 hover:underline mt-2"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-sm px-6 py-2 rounded hover:bg-gray-300"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}

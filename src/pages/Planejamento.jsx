import { useEffect, useState } from 'react';

export default function Planejamento() {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [itens, setItens] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('itensPlanejamento');
    if (dados) {
      setItens(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('itensPlanejamento', JSON.stringify(itens));
  }, [itens]);

  const limparCampos = () => {
    setDescricao('');
    setCategoria('');
    setValorEstimado('');
    setValorPago('');
    setEditandoId(null);
  };

  const adicionarOuAtualizarItem = () => {
    if (!descricao || !categoria || !valorEstimado) return;

    const novoItem = {
      id: editandoId || Date.now(),
      descricao,
      categoria,
      valorEstimado: parseFloat(valorEstimado),
      valorPago: parseFloat(valorPago) || 0,
    };

    const novosItens = editandoId
      ? itens.map((item) => (item.id === editandoId ? novoItem : item))
      : [...itens, novoItem];

    setItens(novosItens);
    limparCampos();
  };

  const editarItem = (item) => {
    setDescricao(item.descricao);
    setCategoria(item.categoria);
    setValorEstimado(item.valorEstimado);
    setValorPago(item.valorPago);
    setEditandoId(item.id);
  };

  const excluirItem = (id) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold text-purple-600">
          {editandoId ? 'Editar Item' : 'Adicionar Item'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Descrição"
            className="border rounded px-3 py-2"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione a categoria</option>
            <option value="Casa e Mobília">Casa e Mobília</option>
            <option value="Cerimônia e Festa">Cerimônia e Festa</option>
            <option value="Lua de Mel">Lua de Mel</option>
            <option value="Documentação">Documentação</option>
            <option value="Outros">Outros</option>
          </select>
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
        <div className="flex gap-2">
          <button
            onClick={adicionarOuAtualizarItem}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {editandoId ? 'Atualizar' : 'Adicionar'}
          </button>
          {editandoId && (
            <button
              onClick={limparCampos}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {itens.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{item.descricao}</p>
                <p className="text-sm text-gray-500">{item.categoria}</p>
                <p className="text-sm text-gray-600">
                  Estimado: R$ {item.valorEstimado.toFixed(2)} | Pago: R$ {item.valorPago.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarItem(item)}
                  className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirItem(item.id)}
                  className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

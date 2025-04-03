import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default function Planejamento() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [itens, setItens] = useState([]);

  const colecaoRef = collection(db, 'planejamento');

  // Buscar dados do Firebase
  const carregarItens = async () => {
    const snapshot = await getDocs(colecaoRef);
    const dados = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setItens(dados);
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const adicionarItem = async () => {
    if (!descricao || !tipo) return;

    const novo = {
      tipo,
      descricao,
      valorEstimado: parseFloat(valorEstimado) || 0,
      valorPago: parseFloat(valorPago) || 0
    };

    await addDoc(colecaoRef, novo);
    setTipo('');
    setDescricao('');
    setValorEstimado('');
    setValorPago('');
    carregarItens(); // atualiza a lista
  };

  const excluirItem = async (id) => {
    await deleteDoc(doc(db, 'planejamento', id));
    carregarItens(); // atualiza a lista
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold text-purple-600">Adicionar Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Tipo</option>
            <option value="Mobiliário">Mobiliário</option>
            <option value="Reforma">Reforma</option>
            <option value="Convidados">Convidados</option>
            <option value="Fotografia">Fotografia</option>
            <option value="Outros">Outros</option>
          </select>

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
              Tipo: {item.tipo} | Estimado: R$ {item.valorEstimado.toFixed(2).replace('.', ',')} | Pago: R$ {item.valorPago.toFixed(2).replace('.', ',')}
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

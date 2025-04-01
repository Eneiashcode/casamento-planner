import { useEffect, useState } from 'react';

export default function Convidados() {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [acompanhantes, setAcompanhantes] = useState('');
  const [presenca, setPresenca] = useState('Pendente');
  const [observacoes, setObservacoes] = useState('');
  const [convidados, setConvidados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    const dados = localStorage.getItem('listaConvidados');
    if (dados) setConvidados(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem('listaConvidados', JSON.stringify(convidados));
  }, [convidados]);

  const limparCampos = () => {
    setNome('');
    setGrupo('');
    setAcompanhantes('');
    setPresenca('Pendente');
    setObservacoes('');
    setEditandoId(null);
  };

  const adicionarOuAtualizar = () => {
    if (!nome || !grupo) return;

    const novo = {
      id: editandoId || Date.now(),
      nome,
      grupo,
      acompanhantes: parseInt(acompanhantes) || 0,
      presenca,
      observacoes,
    };

    const novaLista = editandoId
      ? convidados.map((c) => (c.id === editandoId ? novo : c))
      : [...convidados, novo];

    setConvidados(novaLista);
    limparCampos();
  };

  const editar = (item) => {
    setNome(item.nome);
    setGrupo(item.grupo);
    setAcompanhantes(item.acompanhantes.toString());
    setPresenca(item.presenca);
    setObservacoes(item.observacoes);
    setEditandoId(item.id);
  };

  const excluir = (id) => {
    setConvidados(convidados.filter((c) => c.id !== id));
  };

  const listaFiltrada = convidados.filter((c) =>
    c.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalConvidados = convidados.length;
  const totalPessoas = convidados.reduce((acc, c) => acc + 1 + c.acompanhantes, 0);
  const totalPaginas = Math.ceil(listaFiltrada.length / itensPorPagina);

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const listaPaginada = listaFiltrada.slice(indiceInicial, indiceInicial + itensPorPagina);

  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold text-purple-600">
          {editandoId ? 'Editar Convidado' : 'Adicionar Convidado'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome do convidado"
            className="border rounded px-3 py-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grupo (Família, Amigos, etc.)"
            className="border rounded px-3 py-2"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Acompanhantes"
            className="border rounded px-3 py-2"
            value={acompanhantes}
            onChange={(e) => setAcompanhantes(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={presenca}
            onChange={(e) => setPresenca(e.target.value)}
          >
            <option>Pendente</option>
            <option>Confirmado</option>
            <option>Não vai</option>
          </select>
        </div>
        <textarea
          placeholder="Observações (opcional)"
          className="w-full border rounded px-3 py-2"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        ></textarea>

        <div className="flex gap-2">
          <button
            onClick={adicionarOuAtualizar}
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

      <div className="flex justify-between items-center flex-wrap gap-2">
        <p className="text-sm text-gray-600">
          Total de convidados: {totalConvidados} | Total de pessoas: {totalPessoas}
        </p>
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border rounded px-3 py-2"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPaginaAtual(1);
          }}
        />
      </div>

      <div className="space-y-2">
        {listaPaginada.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{c.nome}</p>
                <p className="text-sm text-gray-500">
                  Grupo: {c.grupo} | Acompanhantes: {c.acompanhantes}
                </p>
                <p className="text-sm text-gray-500">Presença: {c.presenca}</p>
                {c.observacoes && (
                  <p className="text-xs text-gray-400">Obs: {c.observacoes}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editar(c)}
                  className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(c.id)}
                  className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            onClick={() => mudarPagina(paginaAtual - 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            disabled={paginaAtual === 1}
          >
            ⬅ Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            onClick={() => mudarPagina(paginaAtual + 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            disabled={paginaAtual === totalPaginas}
          >
            Próxima ➡
          </button>
        </div>
      )}
    </div>
  );
}

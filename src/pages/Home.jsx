import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

// 🆕 Imports do Swiper com autoplay
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [dinheiroDisponivel, setDinheiroDisponivel] = useState('');
  const [itens, setItens] = useState([]);

  const docRef = doc(db, 'configuracoes', 'dados');
  const colecaoRef = collection(db, 'planejamento');

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const carregarDados = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const valor = docSnap.data().dinheiroDisponivel || 0;
      setDinheiroDisponivel(formatarValor(valor));
    }

    const snapshot = await getDocs(colecaoRef);
    const dados = snapshot.docs.map((doc) => doc.data());
    setItens(dados);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleChange = async (e) => {
    const valorBruto = e.target.value.replace(/\D/g, '');
    const valorNumerico = parseFloat(valorBruto) / 100;
    setDinheiroDisponivel(formatarValor(valorNumerico));
    await updateDoc(docRef, {
      dinheiroDisponivel: valorNumerico,
    });
  };

  const valorNumerico = parseFloat(
    dinheiroDisponivel.replace(/[R$\s.]/g, '').replace(',', '.')
  ) || 0;

  const totalEstimado = itens.reduce((acc, item) => acc + item.valorEstimado, 0);
  const totalPago = itens.reduce((acc, item) => acc + item.valorPago, 0);
  const saldoRestante = valorNumerico - totalPago;

  return (
    <div className="space-y-4">
      {/* Título da Home */}
      <h2 className="text-2xl font-bold text-center text-purple-700">💍 Nosso Planejamento</h2>

      {/* Carrossel de fotos com autoplay */}
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          modules={[Pagination, Autoplay]}
          className="my-4 rounded-xl overflow-hidden shadow-md max-w-xl mx-auto"
        >
          <SwiperSlide>
            <img src="/fotos/foto1.jpg" alt="Foto 1" className="w-full h-64 object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/fotos/foto2.jpg" alt="Foto 2" className="w-full h-64 object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/fotos/foto3.jpg" alt="Foto 3" className="w-full h-64 object-cover" />
          </SwiperSlide>
        </Swiper>

      {/* Blocos de valores */}
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
    </div>
  );
}

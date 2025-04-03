// Importa funções principais do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtj4kftKB2vRHKv0Z9TJBsiUlwFrdN9Mo",
  authDomain: "casamento-planner.firebaseapp.com",
  projectId: "casamento-planner",
  storageBucket: "casamento-planner.firebasestorage.app",
  messagingSenderId: "240465293636",
  appId: "1:240465293636:web:60ad01cb966d04209ee711"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta a instância do Firestore
export const db = getFirestore(app);

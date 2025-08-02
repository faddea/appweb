// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApBVMLPQ9tOEWhBJWUEPta4R0O9BGq8fI",
  authDomain: "netgestor-29c95.firebaseapp.com",
  projectId: "netgestor-29c95",
  storageBucket: "netgestor-29c95.appspot.com",
  messagingSenderId: "671541068910",
  appId: "1:671541068910:web:d546c1678a7069242a127f",
  measurementId: "G-59TGHLWJC9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar
export { auth, db };

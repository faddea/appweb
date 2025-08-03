// pedidos.js
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { db } from './firebase.js';

async function cargarPedidos() {
  const contenedor = document.getElementById("listaPedidos");
  const snapshot = await getDocs(collection(db, "pedidos_netbooks"));
  contenedor.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "bg-white dark:bg-gray-800 p-4 rounded shadow";

    div.innerHTML = `
      <p><strong>Docente:</strong> ${data.emailDocente}</p>
      <p><strong>Fecha:</strong> ${data.fecha} - ${data.hora}</p>
      <p><strong>Retirado por:</strong> ${data.retiradoPor}</p>
      <p><strong>Netbooks:</strong> ${data.netbooks.join(", ")}</p>
      <p><strong>Estado:</strong> ${data.estado}</p>
    `;
    contenedor.appendChild(div);
  });
}

cargarPedidos();

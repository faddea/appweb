import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";

async function cargarNetbooks() {
  const contenedor = document.getElementById("contenedorNetbooks");
  contenedor.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "netbooks"));

  querySnapshot.forEach(doc => {
    const netbook = doc.data();

    // Creamos el div de la netbook
    const div = document.createElement("div");
    div.classList.add("netbook");

    // Aplicar clase según estado
    div.classList.add(netbook.estado); // ej: .disponible, .pedida

    // Mostrar el código o ID
    div.textContent = netbook.codigo || doc.id;

    contenedor.appendChild(div);
  });
}

cargarNetbooks();

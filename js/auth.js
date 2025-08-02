// auth.js
import { auth, db } from './firebaseconfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rol = docSnap.data().rol;
        redirigirPorRol(rol);
      } else {
        alert("No se encontró información de rol");
      }

    } catch (error) {
      console.error("Error en login:", error);
      alert("Error: " + error.message);
    }
  });
}

function redirigirPorRol(rol) {
  switch (rol) {
    case "administrador":
      window.location.href = "admin.html";
      break;
    case "docente":
      window.location.href = "docente.html";
      break;
    case "regencia":
      window.location.href = "regencia.html";
      break;
    default:
      alert("Rol desconocido");
  }
}

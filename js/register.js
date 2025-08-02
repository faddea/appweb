// register.js
import { auth, db } from './firebaseconfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const registroForm = document.getElementById("registroForm");

registroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("contrasena").value;
  const rol = document.getElementById("rol").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      email: email,
      rol: rol
    });

    // Redirigir por rol
    switch (rol) {
      case "administrador":
        window.location.href = "./admin.html";
        break;
      case "docente":
        window.location.href = "./docente.html";
        break;
      case "regencia":
        window.location.href = "./regencia.html";
        break;
      default:
        alert("Rol desconocido");
    }

  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error: " + error.message);
  }
});

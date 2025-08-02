// auth.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// REGISTRO
const registerForm = document.getElementById("signup-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = registerForm["email"].value;
    const password = registerForm["contrasena"].value;
    const rol = registerForm["rol"].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Guardamos el rol en Firestore
      await setDoc(doc(db, "usuarios", uid), {
        email,
        rol
      });

      alert("Usuario registrado");
      redirigirPorRol(rol);
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  });
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Leemos el rol desde Firestore
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const datos = docSnap.data();
        redirigirPorRol(datos.rol);
      } else {
        alert("No se encontró información del usuario");
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
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

// auth.js
import { auth } from './firebaseconfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.getElementById("registroForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.contrasena.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuario registrado
      const user = userCredential.user;
      alert("Registro exitoso!");
      window.location.href = "admin.html"; // o la página correspondiente
    })
    .catch((error) => {
      alert("Error en el registro: " + error.message);
    });
});


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

import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const db = getFirestore(app);

// Luego del login:
const user = userCredential.user;

const docRef = doc(db, "usuarios", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const rol = docSnap.data().rol;
  if (rol === "administrador") {
    window.location.href = "admin.html";
  } else if (rol === "docente") {
    window.location.href = "docente.html";
  } else if (rol === "regencia") {
    window.location.href = "regencia.html";
  } else {
    alert("Rol desconocido");
  }
} else {
  console.error("No se encontró documento de rol");
}

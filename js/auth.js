// auth.js
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Registro
const registerForm = document.getElementById("signup-form"); // si tu formulario se llama signup-form, usa ese ID
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = registerForm["email"].value;
    const password = registerForm["contrasena"].value;
    const rol = registerForm["rol"].value;


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);
      localStorage.setItem("rol", rol);
      redirigirPorRol(rol);
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  });
}

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario logueado:", userCredential.user);
      const rol = localStorage.getItem("rol");
      redirigirPorRol(rol);
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
      window.location.href = "docente interfaz.html";
      break;
    case "regencia":
      window.location.href = "regencia.html";
      break;
    default:
      alert("Rol desconocido");
  }
}

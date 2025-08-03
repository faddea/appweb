import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const registroForm = document.getElementById('registroForm');

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;
  const rol = document.getElementById('rol').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, contrasena);
    const user = userCredential.user;

    // Guardar datos en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      rol: rol
    });

    // Redirigir según rol
    switch (rol) {
      case 'administrador':
        window.location.href = './admin.html';
        break;
      case 'docente':
        window.location.href = './docente.html';
        break;
      case 'regencia':
        window.location.href = './regencia.html';
        break;
      default:
        alert("Rol desconocido, redireccionando al login.");
        window.location.href = './login.html';
    }

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert("Hubo un error al registrarse: " + error.message);
  }
});

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const db = getFirestore(app);

// Después de `createUserWithEmailAndPassword` y antes del redireccionamiento:
await setDoc(doc(db, "usuarios", userCredential.user.uid), {
  email: email,
  rol: rolSeleccionado // Esto tiene que venir del select del formulario
});

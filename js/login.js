import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, contrasena);
    const user = userCredential.user;

    // Buscar el rol en Firestore
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const rol = userDocSnap.data().rol;

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
          alert('Rol desconocido. Contacte al administrador.');
      }

    } else {
      alert('No se encontró información del usuario.');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error al iniciar sesión: ' + error.message);
  }
});

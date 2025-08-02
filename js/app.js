import { auth, db } from './firebase.js'; // Asegurate de exportar auth y db en firebase.js
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Verificar si el usuario está logueado y redirigir según su rol
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDocRef = doc(db, "usuarios", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const rol = userDoc.data().rol;

      // Redirección basada en rol
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
          console.error("Rol no válido");
          signOut(auth); // cerrar sesión si no tiene rol válido
      }
    } else {
      console.error("El documento del usuario no existe");
      signOut(auth);
    }
  } else {
    console.log("No hay usuario logueado");
    // window.location.href = "./login.html"; // redirigir si querés
  }
});

// Cerrar sesión (asignalo a un botón con id="btnCerrarSesion")
document.getElementById("btnCerrarSesion")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "./login.html";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
});

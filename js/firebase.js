// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyApBVMLPQ9tOEWhBJWUEPta4R0O9BGq8fI",
  authDomain: "netgestor-29c95.firebaseapp.com",
  projectId: "netgestor-29c95",
  storageBucket: "netgestor-29c95.appspot.com",
  messagingSenderId: "671541068910",
  appId: "1:671541068910:web:d546c1678a7069242a127f",
  measurementId: "G-59TGHLWJC9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

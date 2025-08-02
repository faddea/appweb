// firebaseconfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVwIe7ARGUmcLOCphQug0PvFqT46jwaqA",
  authDomain: "netgestor-f418a.firebaseapp.com",
  projectId: "netgestor-f418a",
  storageBucket: "netgestor-f418a.appspot.com",
  messagingSenderId: "1020978290045",
  appId: "1:1020978290045:web:dfeadeb20d73a90ed9c014"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

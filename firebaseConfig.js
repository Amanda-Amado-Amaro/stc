// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1Bdnt3WqOwWWERHZgL8QuRD3Lx2HYhN0",
  authDomain: "strategy-to-chaos.firebaseapp.com",
  projectId: "strategy-to-chaos",
  storageBucket: "strategy-to-chaos.firebasestorage.app",
  messagingSenderId: "1076292459739",
  appId: "1:1076292459739:web:1a77db57eb37235077c0fe",
  measurementId: "G-E2M5HRGS8M"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };

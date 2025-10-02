import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const btnLogin = document.getElementById("btnLogin");
const btnCadastro = document.getElementById("btnCadastro");
const msg = document.getElementById("mensagem");

// LOGIN
btnLogin?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      msg.style.color = "green";
      msg.textContent = "Login realizado!";
      window.location.href = "index.html"; // redireciona para gestão de projetos
    })
    .catch(error => {
      msg.style.color = "red";
      msg.textContent = "Erro: " + error.message;
    });
});

// CADASTRO
btnCadastro?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      msg.style.color = "green";
      msg.textContent = "Usuário cadastrado!";
    })
    .catch(error => {
      msg.style.color = "red";
      msg.textContent = "Erro: " + error.message;
    });
});

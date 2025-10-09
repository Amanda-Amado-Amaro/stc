import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

import { 
  salvarResposta, buscarRespostas, excluirResposta, concluirResposta, 
  salvarContato, buscarContatos, excluirContato 
} from "./crud.js";

/* ============================= */
/* PROTEÇÃO DE ROTA              */
/* ============================= */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    carregarRespostas();
    carregarContatos();
  }
});

// Botão de logout
const btnLogout = document.createElement("button");
btnLogout.textContent = "Sair";
btnLogout.style.margin = "10px";
document.body.insertBefore(btnLogout, document.body.firstChild);

btnLogout.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "login.html");
});

/* ============================= */
/* ELEMENTOS PRINCIPAIS          */
/* ============================= */
const form = document.getElementById("formulario");
const lista = document.getElementById("lista");

const filtroNome = document.getElementById("filtroNome");
const filtroEstilo = document.getElementById("filtroEstilo");
const filtroData = document.getElementById("filtroData");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnLimpar = document.getElementById("btnLimpar");

const formContato = document.getElementById("formContato");
const listaContatos = document.getElementById("listaContatos");

const filtroEstiloContato = document.getElementById("filtroEstiloContato");
const btnFiltrarContato = document.getElementById("btnFiltrarContato");
const btnLimparContato = document.getElementById("btnLimparContato");

let todasRespostas = {};
let todosContatos = {};

/* ============================= */
/* PROJETOS                      */
/* ============================= */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nomeProjeto = document.getElementById("nomeProjeto").value;
  const estiloProjeto = document.getElementById("estiloProjeto").value;
  const materiais = document.getElementById("materiais").value;
  const custo = document.getElementById("custo").value;
  const recursosExistentes = document.getElementById("recursosExistentes").value;
  const quantidadeRecursos = document.getElementById("quantidadeRecursos").value;
  const parceiros = document.getElementById("parceiros").value;
  const ideiaPrincipal = document.getElementById("ideiaPrincipal").value;
  const prazo = document.getElementById("prazo").value;

  await salvarResposta(nomeProjeto, estiloProjeto, materiais, custo, recursosExistentes, quantidadeRecursos, parceiros, ideiaPrincipal, prazo);
  form.reset();
  carregarRespostas();
});

async function carregarRespostas() {
  todasRespostas = await buscarRespostas();
  exibirRespostas(Object.entries(todasRespostas));
}

function exibirRespostas(listaRespostas) {
  lista.innerHTML = "";
  listaRespostas.forEach(([id, item]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nomeProjeto}</strong> (${item.estiloProjeto})<br>
      Materiais: ${item.materiais} | Custo: ${item.custo} | Recursos: ${item.recursosExistentes} | Quantidade: ${item.quantidadeRecursos} | Parceiros: ${item.parceiros}<br>
      Ideia: ${item.ideiaPrincipal} | Prazo: ${item.prazo}<br>
      📅 Criado em: ${item.dataCriacao} | Status: <span style="color:${item.concluido ? 'green' : 'red'}">${item.concluido ? 'Concluído' : 'Em andamento'}</span>
      <div style="margin-top:8px;">
        <button class="btnConcluir">${item.concluido ? 'Reabrir' : 'Concluir'}</button>
        <button class="btnExcluir">Excluir</button>
      </div>
    `;

    li.querySelector(".btnConcluir").addEventListener("click", async () => {
      await concluirResposta(id, !item.concluido);
      carregarRespostas();
    });

    li.querySelector(".btnExcluir").addEventListener("click", async () => {
      if (confirm("Tem certeza que deseja excluir este projeto?")) {
        await excluirResposta(id);
        carregarRespostas();
      }
    });

    lista.appendChild(li);
  });
}

/* ============================= */
/* FILTROS DE PROJETOS           */
/* ============================= */
btnFiltrar.addEventListener("click", () => {
  const nomeFiltro = filtroNome.value.toLowerCase();
  const estiloFiltro = filtroEstilo.value;
  const dataFiltro = filtroData.value;

  let filtradas = Object.entries(todasRespostas).filter(([id, item]) => {
    const condNome = nomeFiltro ? item.nomeProjeto.toLowerCase().includes(nomeFiltro) : true;
    const condEstilo = estiloFiltro ? item.estiloProjeto === estiloFiltro : true;
    const condData = dataFiltro ? item.dataCriacao === dataFiltro : true;
    return condNome && condEstilo && condData;
  });

  exibirRespostas(filtradas);
});

btnLimpar.addEventListener("click", () => {
  filtroNome.value = "";
  filtroEstilo.value = "";
  filtroData.value = "";
  exibirRespostas(Object.entries(todasRespostas));
});

/* ============================= */
/* CONTATOS                      */
/* ============================= */
formContato.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nomeContato").value;
  const email = document.getElementById("emailContato").value;
  const telefone = document.getElementById("telefoneContato").value;
  const estiloContato = document.getElementById("estiloContato").value;

  await salvarContato(nome, email, telefone, estiloContato);
  formContato.reset();
  carregarContatos();
});

async function carregarContatos() {
  todosContatos = await buscarContatos();
  exibirContatos(Object.entries(todosContatos));
}

function exibirContatos(listaDados) {
  listaContatos.innerHTML = "";
  listaDados.forEach(([id, item]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nome}</strong> | 📧 ${item.email} | 📞 ${item.telefone} | Estilo: ${item.estiloProjeto}
      <button class="btnExcluirContato">Excluir</button>
    `;

    li.querySelector(".btnExcluirContato").addEventListener("click", async () => {
      if (confirm("Excluir este contato?")) {
        await excluirContato(id);
        carregarContatos();
      }
    });

    listaContatos.appendChild(li);
  });
}

/* ============================= */
/* FILTRO DE CONTATOS            */
/* ============================= */
btnFiltrarContato.addEventListener("click", () => {
  const estiloFiltro = filtroEstiloContato.value;

  let filtrados = Object.entries(todosContatos).filter(([id, item]) => {
    return estiloFiltro ? item.estiloProjeto === estiloFiltro : true;
  });

  exibirContatos(filtrados);
});

btnLimparContato.addEventListener("click", () => {
  filtroEstiloContato.value = "";
  exibirContatos(Object.entries(todosContatos));
});

// ======== MENU RESPONSIVO ========
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

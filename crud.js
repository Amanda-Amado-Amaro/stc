import { database, auth } from "./firebaseConfig.js";
import { ref, push, set, get, update, remove, child } 
  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

/* ============================= */
/* PROJETOS                      */
/* ============================= */
async function salvarResposta(nomeProjeto, estiloProjeto, materiais, custo, recursosExistentes, quantidadeRecursos, parceiros, ideiaPrincipal, prazo) {
  const user = auth.currentUser;
  if (!user) return;

  const respostasRef = ref(database, "projetos/" + user.uid);
  const novaRef = push(respostasRef);

  return set(novaRef, {
    nomeProjeto,
    estiloProjeto,
    materiais,
    custo,
    recursosExistentes,
    quantidadeRecursos,
    parceiros,
    ideiaPrincipal,
    prazo,
    dataCriacao: new Date().toISOString().split("T")[0],
    concluido: false
  });
}

async function buscarRespostas() {
  const user = auth.currentUser;
  if (!user) return {};

  const snapshot = await get(child(ref(database), "projetos/" + user.uid));
  return snapshot.exists() ? snapshot.val() : {};
}

async function excluirResposta(id) {
  const user = auth.currentUser;
  if (!user) return;
  return remove(ref(database, "projetos/" + user.uid + "/" + id));
}

async function concluirResposta(id, status) {
  const user = auth.currentUser;
  if (!user) return;
  return update(ref(database, "projetos/" + user.uid + "/" + id), { concluido: status });
}

/* ============================= */
/* CONTATOS                      */
/* ============================= */
async function salvarContato(nome, email, telefone, estiloProjeto) {
  const user = auth.currentUser;
  if (!user) return;

  const contatosRef = ref(database, "contatos/" + user.uid);
  const novaRef = push(contatosRef);

  return set(novaRef, {
    nome,
    email,
    telefone,
    estiloProjeto,
    dataCriacao: new Date().toISOString().split("T")[0]
  });
}

async function buscarContatos() {
  const user = auth.currentUser;
  if (!user) return {};

  const snapshot = await get(child(ref(database), "contatos/" + user.uid));
  return snapshot.exists() ? snapshot.val() : {};
}

async function excluirContato(id) {
  const user = auth.currentUser;
  if (!user) return;
  return remove(ref(database, "contatos/" + user.uid + "/" + id));
}

export { salvarResposta, buscarRespostas, excluirResposta, concluirResposta, salvarContato, buscarContatos, excluirContato };

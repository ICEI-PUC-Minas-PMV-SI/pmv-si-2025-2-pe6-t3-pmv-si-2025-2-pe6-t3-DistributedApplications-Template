// src/services/auth.js
import { api } from "./api"; // axios pré-configurado

export async function solicitarRedefinicaoSenha(email) {
  const resposta = await api.post("/Auth/forgot-password", { email });
  return resposta.data; // ideal: { mensagem: "..." }
}

export async function redefinirSenha(token, novaSenha) {
  const resposta = await api.post("/Auth/reset-password", { token, novaSenha });
  return resposta.data;
}

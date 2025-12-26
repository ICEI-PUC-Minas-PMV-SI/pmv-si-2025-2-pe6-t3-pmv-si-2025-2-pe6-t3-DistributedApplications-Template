// src/services/produtos.js
import { api } from "./api";

/** GET com fallbacks de rota */
async function tentarGet(path) {
  try {
    const { data } = await api.get(path);
    return Array.isArray(data) ? data : data?.items ?? data ?? null;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
}

/** Lista produtos */
export async function listarProdutos() {
  return (
    (await tentarGet("/api/Produto"))  ||
    (await tentarGet("/api/Product"))  ||
    (await tentarGet("/api/Products")) ||
    []
  );
}

/** Obtém por id */
export async function obterProduto(id) {
  return (
    (await tentarGet(`/api/Produto/${id}`))  ||
    (await tentarGet(`/api/Product/${id}`))  ||
    (await tentarGet(`/api/Products/${id}`)) ||
    null
  );
}

/** Cria produto */
export async function criarProduto(produto) {
  // tente rota singular e, se 404, tente plural
  try {
    const { data } = await api.post("/api/Produto", produto);
    return data;
  } catch (e) {
    if (e?.response?.status === 404) {
      const { data } = await api.post("/api/Products", produto);
      return data;
    }
    throw e;
  }
}

/** Atualiza produto */
export async function atualizarProduto(id, produto) {
  try {
    await api.put(`/api/Produto/${id}`, produto);
  } catch (e) {
    if (e?.response?.status === 404) {
      await api.put(`/api/Products/${id}`, produto);
      return;
    }
    throw e;
  }
}

/** Exclui produto */
export async function excluirProduto(id) {
  try {
    await api.delete(`/api/Produto/${id}`);
  } catch (e) {
    if (e?.response?.status === 404) {
      await api.delete(`/api/Products/${id}`);
      return;
    }
    throw e;
  }
}

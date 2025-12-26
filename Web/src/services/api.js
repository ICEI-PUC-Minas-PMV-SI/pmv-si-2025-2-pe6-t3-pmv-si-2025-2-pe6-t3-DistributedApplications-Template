// src/services/api.js
import axios from "axios";

/**
 * Base URL SEM /api (o /api fica no path de cada request)
 * VITE_API_BASE_URL pode ser algo como: http://localhost:5210
 */
function buildBaseURL() {
  const raw = import.meta.env.VITE_API_BASE_URL || "http://localhost:5210";
  return String(raw).replace(/\/+$/, ""); // remove barras finais
}

export const api = axios.create({
  baseURL: buildBaseURL(),
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// 🔐 injeta JWT se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function apiErrorMessage(error) {
  const r = error?.response;
  return (
    r?.data?.mensagem ||
    r?.data?.detail ||
    r?.data?.title ||
    error?.message ||
    "Erro inesperado. Tente novamente."
  );
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const s = err?.response?.status;
    const u = err?.config?.url;
    console.error(`[API ${s ?? "ERR"}] ${u}:`, apiErrorMessage(err));
    return Promise.reject(err);
  }
);

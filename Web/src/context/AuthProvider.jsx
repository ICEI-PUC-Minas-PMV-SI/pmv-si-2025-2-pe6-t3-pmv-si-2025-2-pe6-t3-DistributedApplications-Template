// src/contexts/AuthProvider.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { api } from "../services/api";

const LOGIN_PATH = import.meta.env.VITE_LOGIN_PATH || "/Auth/login";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

// -- Helpers -----------------------------------------------------------------
function safeJsonParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function toArray(x) {
  if (!x) return [];
  return Array.isArray(x) ? x : [x];
}

function extractRoles(u) {
  if (!u) return [];
  // 1) do user:
  const fromUser =
    u.perfil ||
    u.role ||
    u.roles ||
    u?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  let roles = toArray(fromUser);

  // 2) do payload (se tiver)
  const claims = u._claims || {};
  const fromClaims =
    claims.role ||
    claims.roles ||
    claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  roles = roles.length ? roles : toArray(fromClaims);

  // normaliza para UPPERCASE sem acentos
  return roles
    .filter(Boolean)
    .map(r => String(r).trim().toUpperCase());
}

function normalizeAuthResponse(data) {
  const tok =
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.jwtToken ||
    data?.data?.token ||
    null;

  let usr = data?.user || data?.usuario || data?.data?.user || data?.claims || null;

  if (!usr && tok) {
    const payload = parseJwt(tok);
    if (payload) {
      usr = {
        id: payload.sub || payload.nameid || payload.sid || null,
        nome:
          payload.name ||
          payload.unique_name ||
          payload.given_name ||
          payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
          null,
        email:
          payload.email ||
          payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
          null,
        perfil:
          payload.role ||
          payload.roles ||
          payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          null,
        _claims: payload,
      };
    }
  }

  // Garantir perfil como string uppercase se existir
  const perfil = usr?.perfil
    ? (Array.isArray(usr.perfil) ? usr.perfil[0] : usr.perfil)
    : null;

  if (usr && perfil) {
    usr = { ...usr, perfil: String(perfil).toUpperCase() };
  }

  return { tok, usr };
}

// centraliza session/header
function setSession(token) {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
  }
}

// -----------------------------------------------------------------------------

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => safeJsonParse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  // aplica header do axios ao montar e quando token mudar
  useEffect(() => {
    setSession(token);
  }, [token]);

  // (Opcional) Interceptor global para 401 → logout
  useEffect(() => {
    const id = api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(id);
  }, []);

  async function login(email, senha) {
    setLoading(true);
    try {
      if (!email || !senha) return { ok: false, message: "Informe e-mail e senha." };

      const res = await api.post(LOGIN_PATH, { email, password: senha });
      const { tok, usr } = normalizeAuthResponse(res.data);
      if (!tok) throw new Error("Token não recebido da API.");

      setToken(tok);
      setSession(tok);

      if (usr) {
        localStorage.setItem("user", JSON.stringify(usr));
        setUser(usr);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
      return { ok: true };
    } catch (err) {
      const msgFromApi = err?.response?.data?.message || err?.response?.data?.error || err?.message;
      const status = err?.response?.status;
      let message = "Falha no login.";
      if (status === 400) message = "Requisição inválida (400).";
      else if (status === 401) message = "Credenciais inválidas (401).";
      else if (status === 403) message = "Acesso negado (403).";
      else if (status === 404) message = "Rota de login não encontrada (404).";
      else if (status >= 500) message = "Erro no servidor (5xx).";
      if (msgFromApi) message = msgFromApi;
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  }

  const roles = extractRoles(user);
  const isAuthenticated = !!token;
  // prioriza igualdade, mas mantém fallback robusto
  const isAdmin = roles.includes("ADMINISTRADOR") || roles.includes("ADMIN") ||
                  roles.some(r => r.includes("ADMIN"));

  const value = useMemo(
    () => ({ user, token, roles, isAuthenticated, isAdmin, loading, login, logout, setUser, setToken }),
    [user, token, roles, isAuthenticated, isAdmin, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

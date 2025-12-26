// src/pages/EsqueciSenha.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import logoHF from "../assets/logoHF.png";
import "./Login.css"; // reaproveita o estilo

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(""); setErr("");
    if (!email) return setErr("Informe o e-mail.");
    setLoading(true);
    try {
      // Ajuste a rota conforme sua API (ex.: /api/Auth/forgot-password)
      await api.post("/api/Auth/forgot-password", { email });
      setMsg("Se o e-mail existir, enviaremos instruções de redefinição.");
    } catch (error) {
      setErr(error?.response?.data?.message || "Não foi possível processar a solicitação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-hero">
          <img src={logoHF} alt="Logo Hotel Fazenda" className="login-logo" />
        </div>

        <div className="login-body">
          <h2 className="login-title">Redefinir senha</h2>
          <p className="login-subtitle">Informe seu e-mail para receber o link</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label">E-mail</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoFocus
            />

            {msg && <div className="login-success">{msg}</div>}
            {err && <div className="login-error">{err}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link"}
            </button>

            <div className="login-actions">
              <Link to="/login" className="login-link">Voltar ao login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

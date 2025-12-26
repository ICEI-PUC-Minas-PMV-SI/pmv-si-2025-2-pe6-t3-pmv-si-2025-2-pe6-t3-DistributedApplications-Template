// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import logoHF from "../assets/logoHF.png";
import "../pages/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !senha) return setError("Informe e-mail e senha.");
    const res = await login(email, senha);
    if (res.ok) navigate("/", { replace: true });
    else setError(res.message);
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-hero">
          <img src={logoHF} alt="Logo Hotel Fazenda" className="login-logo" />
        </div>

        <div className="login-body">
          <h2 className="login-title">Acessar o sistema</h2>
          <p className="login-subtitle">Hotel Fazenda</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="login-input"
              autoFocus
            />

            <label className="login-label">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="login-input"
            />

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <div className="login-actions">
              <Link to="/esqueci-senha" className="login-link">
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

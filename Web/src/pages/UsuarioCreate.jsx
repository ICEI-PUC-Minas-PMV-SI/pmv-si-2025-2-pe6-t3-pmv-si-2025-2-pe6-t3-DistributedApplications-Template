// src/pages/UsuarioCreate.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthProvider.jsx";
import "./usuarioCreate.css";
import addUsuarioIcon from "../assets/addUsuario.png"; // ✅ caminho correto

const ROLES = [
  { value: "ADMINISTRADOR", label: "Administrador" },
  { value: "GERENTE", label: "Gerente" },
  { value: "GARCOM", label: "Garçom" },
];

export default function UsuarioCreate() {
  const { token, isAdmin } = useAuth?.() || {};
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    perfil: ROLES[1].value,
    ativo: true,
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (!form.nome.trim()) return "Informe o nome.";
    if (!form.email.trim()) return "Informe o e-mail.";
    const emailOk = /.+@.+\..+/.test(form.email);
    if (!emailOk) return "E-mail inválido.";
    if (!form.senha || form.senha.length < 6)
      return "A senha deve ter pelo menos 6 caracteres.";
    if (form.senha !== form.confirmarSenha)
      return "As senhas não coincidem.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const v = validate();
    if (v) return setErr(v);
    try {
      setSaving(true);
      const payload = {
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
        perfil: form.perfil,
        ativo: form.ativo,
      };
      const res = await api.post("/api/usuarios", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200 || res.status === 201) {
        setMsg("Usuário cadastrado com sucesso!");
        setForm({
          nome: "",
          email: "",
          senha: "",
          confirmarSenha: "",
          perfil: ROLES[1].value,
          ativo: true,
        });
      }
    } catch (error) {
      setErr(error?.response?.data?.message || "Erro ao salvar usuário.");
    } finally {
      setSaving(false);
    }
  }

  if (!isAdmin) {
    return (
      <div className="u-wrapper">
        <div className="u-card">
          <h2>Acesso negado</h2>
          <p>Somente administradores podem cadastrar usuários.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="u-wrapper">
      <form onSubmit={handleSubmit} className="u-card">
        <div className="u-header">
          <h2 className="u-title">
            <img
              src={addUsuarioIcon}
              alt="Adicionar usuário"
              width={30}
              height={30}
              style={{ verticalAlign: "middle", marginRight: 8 }}
            />
            Novo Usuário
          </h2>
          <Link to="/" className="u-back">
            ← Voltar
          </Link>
        </div>

        <label className="u-label">Nome</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="u-input"
        />

        <label className="u-label">E-mail</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="u-input"
        />

        <label className="u-label">Senha</label>
        <input
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          className="u-input"
        />

        <label className="u-label">Confirmar senha</label>
        <input
          name="confirmarSenha"
          type="password"
          value={form.confirmarSenha}
          onChange={handleChange}
          className="u-input"
        />

        <label className="u-label">Perfil</label>
        <select
          name="perfil"
          value={form.perfil}
          onChange={handleChange}
          className="u-select"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {err && <div className="u-error">{err}</div>}
        {msg && <div className="u-success">{msg}</div>}

        <button className="u-btn" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}

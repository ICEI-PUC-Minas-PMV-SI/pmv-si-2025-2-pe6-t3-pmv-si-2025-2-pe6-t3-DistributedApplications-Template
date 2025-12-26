import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { redefinirSenha } from "../services/auth.js";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function forcaSenha(pwd) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/\d/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s; // 0..5
}

export default function RedefinirSenha() {
  const q = useQuery();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [ok, setOk] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setToken(q.get("token") || "");
  }, [q]);

  const score = forcaSenha(senha);
  const podeEnviar = token && senha.length >= 8 && senha === confirmar && score >= 3 && !carregando;

  async function aoSubmeter(e) {
    e.preventDefault();
    setOk(null);
    setErro(null);
    if (!podeEnviar) return;

    try {
      setCarregando(true);
      const resp = await redefinirSenha(token, senha);
      setOk((resp && resp.mensagem) || "Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg =
        (err && err.response && err.response.data && err.response.data.mensagem) ||
        err?.message ||
        "Não foi possível redefinir a senha. Verifique o token e tente novamente.";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-1">Redefinir senha</h1>
        <p className="text-sm text-gray-600 mb-4">
          Cole o token recebido por e-mail (ou abra o link que já traz o token na URL).
        </p>

        {ok && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-green-700 text-sm">
            {ok}
          </div>
        )}
        {erro && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={aoSubmeter} noValidate>
          <label className="block text-sm font-medium mb-1" htmlFor="token">
            Token / Código
          </label>
          <input
            id="token"
            type="text"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Cole aqui o token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <label className="block text-sm font-medium mt-4 mb-1" htmlFor="senha">
            Nova senha
          </label>
          <input
            id="senha"
            type="password"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Mínimo 8 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="mt-1 text-xs text-gray-600">
            Força: {["Muito fraca","Fraca","Regular","Boa","Forte","Excelente"][score]}
          </div>

          <label className="block text-sm font-medium mt-4 mb-1" htmlFor="confirmar">
            Confirmar nova senha
          </label>
          <input
            id="confirmar"
            type="password"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Repita a senha"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />
          {confirmar && confirmar !== senha && (
            <p className="mt-1 text-xs text-red-600">As senhas não conferem.</p>
          )}

          <button
            type="submit"
            disabled={!podeEnviar}
            className={`mt-5 w-full rounded-xl px-4 py-2 font-medium text-white transition ${
              !podeEnviar ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-busy={carregando}
          >
            {carregando ? "Salvando..." : "Redefinir senha"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <Link to="/login" className="hover:underline">Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
}

// src/pages/ProdutoCreate.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { criarProduto } from "../services/produtos";
import "./produtoCreate.css";
import produtoIcon from "../assets/produto.png";
import addIcon from "../assets/+.png";

export default function ProdutoCreate() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState(""); // mantemos string para aceitar vírgula
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [salvando, setSalvando] = useState(false);

  const parsePreco = (v) => Number(String(v).replace(",", "."));

  function valido() {
    if (!nome.trim()) return "Informe o nome do produto.";
    if (!categoria.trim()) return "Informe a categoria.";
    const p = parsePreco(preco);
    if (Number.isNaN(p) || p <= 0) return "Informe um preço válido (maior que zero).";
    return "";
  }

  async function aoSalvar(e) {
    e.preventDefault();
    setErro("");
    setOk("");

    const msg = valido();
    if (msg) return setErro(msg);

    try {
      setSalvando(true);
      await criarProduto({
        nome: nome.trim(),
        categoria: categoria.trim(),
        preco: parsePreco(preco),
        descricao: descricao?.trim() || null,
        ativo,
      });
      setOk("Produto criado com sucesso!");

      setTimeout(() => {
        navigate("/produtos", { replace: true, state: { toast: "Produto criado com sucesso!" } });
      }, 700);
    } catch (err) {
      const detail =
        err?.response?.data?.mensagem ||
        err?.response?.data?.message ||
        err?.message ||
        "Falha ao criar produto.";
      setErro(detail);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="pc-root">
      <div className="pc-card">
        <div className="pc-header">
          <h2 className="pc-title">
            <img src={produtoIcon} alt="" className="pc-ico" />
            Novo Produto
          </h2>
          <Link to="/produtos" className="pc-link">← Voltar</Link>
        </div>

        {erro && <div className="pc-msg pc-erro">{erro}</div>}
        {ok && <div className="pc-msg pc-ok">{ok}</div>}

        <form onSubmit={aoSalvar} className="pc-form">
          <div className="pc-row">
            <label className="pc-label">Nome *</label>
            <input
              className="pc-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Suco de Laranja 300ml"
              autoFocus
            />
          </div>

          <div className="pc-row">
            <label className="pc-label">Categoria *</label>
            <input
              className="pc-input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ex.: Bebidas"
            />
          </div>

          <div className="pc-row">
            <label className="pc-label">Preço (R$) *</label>
            <input
              className="pc-input"
              type="text"
              inputMode="decimal"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Ex.: 12,90"
            />
          </div>

          <div className="pc-row">
            <label className="pc-label">Descrição</label>
            <textarea
              className="pc-textarea"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Observações, alérgenos, etc."
            />
          </div>

          <label className="pc-label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              id="ativo"
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Produto ativo
          </label>

          <div className="pc-actions">
            <Link to="/produtos" className="pc-btn pc-btn--ghost">Cancelar</Link>
            <button type="submit" className="pc-btn pc-btn--primary" disabled={salvando}>
              <img src={addIcon} alt="" className="pc-btn-ico" />
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

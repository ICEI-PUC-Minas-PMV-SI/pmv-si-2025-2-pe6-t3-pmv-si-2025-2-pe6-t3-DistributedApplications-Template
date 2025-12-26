// src/pages/Produtos.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarProdutos } from "../services/produtos";
import "./produtos.css";

// 🖼️ seus arquivos:
import produtoIcon from "../assets/produto.png";
import addIcon from "../assets/+.png";

const fmtBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarProdutos() {
    try {
      setErro("");
      setLoading(true);
      const data = await listarProdutos();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("[produtos] falhou:", e);
      setErro("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregarProdutos(); }, []);

  return (
    <div className="pr-root">
      <div className="pr-card">
        <div className="pr-header">
          <h2 className="pr-title">
            <img src={produtoIcon} alt="Produtos" className="pr-icon" />
            Produtos
          </h2>

          <div className="pr-actionsHeader">
            <button
              className="pr-btn pr-btn--ghost"
              onClick={carregarProdutos}
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>

            <Link to="/" className="pr-link">← Voltar</Link>

            <Link to="/produtos/novo" className="pr-btn pr-btn--primary">
              <img src={addIcon} alt="" className="pr-icon--sm" />
              Novo Produto
            </Link>
          </div>
        </div>

        {erro && <div className="pr-toast pr-toast--erro">{erro}</div>}

        {loading ? (
          <p className="pr-loading">Carregando...</p>
        ) : produtos.length === 0 ? (
          <div className="pr-empty">Nenhum produto cadastrado ainda.</div>
        ) : (
          <div className="pr-tableWrap">
            <table className="pr-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => {
                  const id = p.id ?? p.Id;
                  const nome = p.nome ?? p.Nome ?? "-";
                  const preco = p.preco ?? p.Preco ?? 0;
                  const categoria = p.categoria ?? p.Categoria ?? "-";
                  return (
                    <tr key={id}>
                      <td>{nome}</td>
                      <td>{fmtBRL.format(Number(preco))}</td>
                      <td>{categoria}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

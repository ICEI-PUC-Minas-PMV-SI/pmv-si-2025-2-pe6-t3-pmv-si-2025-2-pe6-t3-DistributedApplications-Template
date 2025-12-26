// src/pages/ContaHospedagem.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { obterCheckout, encerrarConta, resolverReservaAtiva } from "../services/conta";
import "./conta.css";
import reservaIcon from "../assets/reserva.png";

function fmtBRL(n) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(n || 0));
}
function fmtData(iso) {
  if (!iso) return "-";
  try { return new Date(iso).toLocaleString("pt-BR"); } catch { return iso; }
}

export default function ContaHospedagem() {
  const { hospedagemId } = useParams();         // pode ser reservaId
  const [search] = useSearchParams();           // ou ?roomId=123
  const roomId = search.get("roomId");
  const navigate = useNavigate();

  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const [pagamento, setPagamento] = useState("");
  const [observacao, setObservacao] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      let idParaAbrir = hospedagemId;
      if (!idParaAbrir && roomId) {
        // resolve a reserva e troca a URL para a forma canônica
        const rid = await resolverReservaAtiva(roomId);
        if (rid) {
          navigate(`/conta/${rid}`, { replace: true });
          idParaAbrir = rid;
        }
      }
      const resp = await obterCheckout(idParaAbrir ?? roomId);
      if (!resp?.reservaId && !roomId) setErro("Não foi possível identificar a hospedagem.");
      setDados(resp);
    } catch (e) {
      console.error(e);
      setErro(
        e?.response?.data?.mensagem ||
        e?.response?.data?.message ||
        "Não foi possível carregar a conta."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregar(); /* eslint-disable-next-line */ }, [hospedagemId, roomId]);

  const totais = useMemo(
    () => dados?.valores ?? { tarifaDiaria: 0, noites: 0, totalDiarias: 0, totalPedidos: 0, totalGeral: 0 },
    [dados]
  );

  async function aoEncerrar() {
    if (!dados?.reservaId) return;
    if (!window.confirm("Confirmar encerramento da conta?")) return;

    try {
      setSalvando(true);
      await encerrarConta(dados.reservaId, {
        formaPagamento: pagamento || null,
        observacao: observacao?.trim() || null,
      });
      navigate("/quartos", { replace: true, state: { toast: "Conta encerrada com sucesso!" } });
    } catch (e) {
      console.error(e);
      setErro(
        e?.response?.data?.mensagem ||
        e?.response?.data?.message ||
        "Falha ao encerrar a conta."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="ch-root">
      <div className="ch-card">
        <div className="ch-header">
          <h2 className="ch-title">
            <img src={reservaIcon} alt="" className="ch-title-icon" />
            Encerramento de Conta
          </h2>
          <Link to="/quartos" className="ch-link">← Voltar</Link>
        </div>

        {erro && <div className="ch-alert ch-alert--erro">{erro}</div>}

        {carregando ? (
          <p>Carregando…</p>
        ) : !dados ? (
          <div style={{ marginTop: 12 }}>
            <Link to="/quartos" className="ch-btn ch-btn--ghost">Voltar</Link>
          </div>
        ) : (
          <>
            <div className="ch-grid2 ch-topinfo">
              <div className="ch-box">
                <div className="ch-box-title">Quarto</div>
                <div className="ch-box-line">Número: <strong>{dados.quarto?.numero ?? "-"}</strong></div>
                <div className="ch-box-line">Tipo/Capacidade: {dados.quarto?.tipo ?? "Padrão"} · {dados.quarto?.capacidade ?? 2} hóspedes</div>
              </div>
              <div className="ch-box">
                <div className="ch-box-title">Hóspede</div>
                <div className="ch-box-line">Nome: <strong>{dados.hospede?.nome ?? "—"}</strong></div>
                {dados.hospede?.documento && <div className="ch-box-line">Documento: {dados.hospede.documento}</div>}
                {dados.hospede?.telefone && <div className="ch-box-line">Telefone: {dados.hospede.telefone}</div>}
              </div>
            </div>

            <div className="ch-grid2 ch-topinfo">
              <div className="ch-box">
                <div className="ch-box-title">Período</div>
                <div className="ch-box-line">Entrada: {fmtData(dados.datas?.dataEntrada)}</div>
                <div className="ch-box-line">Saída prevista: {fmtData(dados.datas?.dataSaidaPrevista)}</div>
                <div className="ch-box-line">Saída real: {fmtData(dados.datas?.dataSaidaReal)}</div>
              </div>
              <div className="ch-box">
                <div className="ch-box-title">Diárias</div>
                <div className="ch-box-line">Tarifa diária: <strong>{fmtBRL(totais.tarifaDiaria)}</strong></div>
                <div className="ch-box-line">Noites: <strong>{totais.noites}</strong></div>
                <div className="ch-box-line">Total diárias: <strong>{fmtBRL(totais.totalDiarias)}</strong></div>
              </div>
            </div>

            <div className="ch-section">
              <div className="ch-section-title">Consumos / Pedidos</div>
              {Array.isArray(dados.itens) && dados.itens.length > 0 ? (
                <div className="ch-tablewrap">
                  <table className="ch-table">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left" }}>Item</th>
                        <th>Qtd</th>
                        <th>Preço</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.itens.map((it, idx) => (
                        <tr key={it.id ?? idx}>
                          <td className="ch-td-left">{it.produto ?? "—"}</td>
                          <td>{it.quantidade ?? "—"}</td>
                          <td>{fmtBRL(it.precoUnitario)}</td>
                          <td>{fmtBRL(it.subtotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="ch-td-right"><strong>Total pedidos</strong></td>
                        <td><strong>{fmtBRL(totais.totalPedidos)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="ch-note">Sem itens consumidos.</div>
              )}
            </div>

            <div className="ch-grid2 ch-resume">
              <div className="ch-box">
                <div className="ch-resume-line">
                  <span>Total diárias</span><strong>{fmtBRL(totais.totalDiarias)}</strong>
                </div>
                <div className="ch-resume-line">
                  <span>Total pedidos</span><strong>{fmtBRL(totais.totalPedidos)}</strong>
                </div>
                <div className="ch-resume-line ch-resume-total">
                  <span>Total geral</span><strong>{fmtBRL(totais.totalGeral)}</strong>
                </div>
              </div>

              <div className="ch-box">
                <div className="ch-box-title">Finalização</div>
                <div className="ch-form-row">
                  <label className="ch-label">Forma de pagamento</label>
                  <select className="ch-select" value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="credito">Cartão de crédito</option>
                    <option value="debito">Cartão de débito</option>
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
                <div className="ch-form-row">
                  <label className="ch-label">Observação</label>
                  <textarea
                    className="ch-textarea"
                    rows={3}
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Observações da conta (opcional)"
                  />
                </div>
                <div className="ch-actions">
                  <Link to="/quartos" className="ch-btn ch-btn--ghost">Cancelar</Link>
                  <button
                    type="button"
                    className="ch-btn ch-btn--primary"
                    disabled={salvando || !dados?.reservaId}
                    onClick={aoEncerrar}
                  >
                    {salvando ? "Encerrando..." : "Encerrar conta"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

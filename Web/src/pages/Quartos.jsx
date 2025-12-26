// src/pages/Quartos.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listarQuartos } from "../services/quartos";
import {
  buscarQuartosLivres,
  obterHospedagemAtivaPorQuarto
} from "../services/reservas";
import "./quartos.css";
import quartoIcon from "../assets/quarto.png";

/* ===========================================================
   Error Boundary – evita tela branca
=========================================================== */
function ErrorBoundary({ children }) {
  const [err, setErr] = useState(null);
  if (err) {
    return (
      <div style={{ padding: 16 }}>
        <h3>Falha ao renderizar “Quartos”.</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(err?.message || err)}</pre>
        <div style={{ marginTop: 8, fontSize: 13, opacity: 0.8 }}>
          Veja o Console (F12 → Console) e a aba Network.
        </div>
      </div>
    );
  }
  return <ErrorCatcher onError={setErr}>{children}</ErrorCatcher>;
}

function ErrorCatcher({ onError, children }) {
  try {
    return children;
  } catch (e) {
    onError(e);
    return null;
  }
}

/* ===========================================================
   Helpers
=========================================================== */
function formatarData(iso) {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString("pt-BR");
  } catch {
    return iso;
  }
}

/* ===========================================================
   TELA DE QUARTOS
=========================================================== */
function QuartosInner() {
  const [quartos, setQuartos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroCapacidade, setFiltroCapacidade] = useState("Todos");
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [toast, setToast] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  /* ===========================================================
     Carregar quartos
  =========================================================== */
  async function carregar() {
    setLoading(true);
    setErro("");

    try {
      const rooms = await listarQuartos();
      const roomsSafe = Array.isArray(rooms) ? rooms : rooms?.items ?? rooms ?? [];

      // Se tiver período → recalcula disponibilidade
      if (entrada && saida) {
        let disp = [];
        try {
          disp = await buscarQuartosLivres({ entrada, saida });
        } catch (e) {
          console.warn("[buscarQuartosLivres] falhou:", e);
          disp = [];
        }

        const idsLivres = new Set(disp.map(r => r.id ?? r.Id));

        const result = roomsSafe.map(q => {
          const original = q.status ?? q.Status ?? "Livre";
          if (original === "Manutencao")
            return { ...q, status: "Manutencao", hospede: null };

          const id = q.id ?? q.Id;
          return {
            ...q,
            status: idsLivres.has(id) ? "Livre" : "Ocupado",
            hospede: null
          };
        });

        setQuartos(result);
      } else {
        setQuartos(roomsSafe);
      }
    } catch (e) {
      console.error(e);
      setErro("Não foi possível carregar os quartos.");
      setQuartos([]);
    } finally {
      setLoading(false);
    }
  }

  /* Carrega automaticamente */
  useEffect(() => {
    if (!entrada && !saida) carregar();
    else if (entrada && saida && new Date(saida) > new Date(entrada)) carregar();
  }, [entrada, saida]);

  /* Toast */
  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
      navigate(location.pathname, { replace: true, state: {} });
      const t = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(t);
    }
  }, [location, navigate]);

  /* Atualização automática */
  useEffect(() => {
    if (entrada || saida) return;
    const id = setInterval(() => carregar(), 15000);
    timerRef.current = id;
    return () => clearInterval(id);
  }, [entrada, saida]);

  /* ===========================================================
     Ordenações + filtros (status e capacidade)
  =========================================================== */
  const visiveis = useMemo(() => {
    if (!Array.isArray(quartos)) return [];

    /* 🔢 Ordenação multi-critério:
       1) Número (402, 403...)
       2) Capacidade (2, 4, 5...)
    */
    const ordenados = [...quartos].sort((a, b) => {
      const na = Number(a?.numero ?? a?.Numero ?? 0);
      const nb = Number(b?.numero ?? b?.Numero ?? 0);
      if (na !== nb) return na - nb;

      const capA = Number(a?.capacidade ?? a?.Capacidade ?? 0);
      const capB = Number(b?.capacidade ?? b?.Capacidade ?? 0);
      return capA - capB;
    });

    /* Filtro por status */
    let filtrados = ordenados;
    if (filtroStatus !== "Todos") {
      filtrados = filtrados.filter(q =>
        (q.status ?? "").toLowerCase() === filtroStatus.toLowerCase()
      );
    }

    /* Filtro por capacidade */
    if (filtroCapacidade !== "Todos") {
      const cap = Number(filtroCapacidade);
      filtrados = filtrados.filter(q =>
        Number(q.capacidade ?? q.Capacidade ?? 0) === cap
      );
    }

    return filtrados;
  }, [quartos, filtroStatus, filtroCapacidade]);

  /* ===========================================================
     Badges
  =========================================================== */
  function classePill(status) {
    if (status === "Ocupado") return "qr-pill qr-pill--ocupado";
    if (status === "Manutencao") return "qr-pill qr-pill--manutencao";
    return "qr-pill qr-pill--livre";
  }

  /* ===========================================================
     Encerrar hospedagem
  =========================================================== */
  async function irParaEncerramento(q) {
    const quartoId = q?.id ?? q?.Id;
    if (!quartoId) return;

    if (q?.hospede?.hospedagemId) {
      navigate(`/conta/${q.hospede.hospedagemId}`);
      return;
    }

    try {
      const ativa = await obterHospedagemAtivaPorQuarto(quartoId);
      const id = ativa?.id ?? ativa?.Id;
      if (id) navigate(`/conta/${id}`);
      else alert("Não há hospedagem ativa para este quarto.");
    } catch (err) {
      console.warn(err);
      alert("Falha ao buscar a hospedagem ativa.");
    }
  }

  /* ===========================================================
     RENDER
  =========================================================== */
  return (
    <div className="qr-root">
      <div className="qr-card">
        <div className="qr-header">
          <h2 className="qr-title">
            <img src={quartoIcon} alt="" className="qr-icon" width={40} height={40} />
            Quartos
          </h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="qr-btn qr-btn--ghost"
              onClick={carregar}
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
            <Link to="/" className="qr-link">← Voltar</Link>
          </div>
        </div>

        {toast && <div className="qr-toast qr-toast--ok">{toast}</div>}
        {erro && <div className="qr-toast qr-toast--erro">{erro}</div>}

        {/* ===========================================================
            Toolbar com filtros
        =========================================================== */}
        <div className="qr-toolbar" style={{ flexWrap: "wrap", gap: 12 }}>
          <div>
            <label>Entrada:</label>
            <input type="date" className="qr-input"
              value={entrada} onChange={e => setEntrada(e.target.value)} />
          </div>

          <div>
            <label>Saída:</label>
            <input type="date" className="qr-input"
              value={saida} onChange={e => setSaida(e.target.value)} />
          </div>

          <div style={{ flex: 1 }} />

          <label>Status:</label>
          <select className="qr-select"
            value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Livre">Livre</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Manutencao">Manutenção</option>
          </select>

          <label>Capacidade:</label>
          <select className="qr-select"
            value={filtroCapacidade} onChange={e => setFiltroCapacidade(e.target.value)}>
            <option value="Todos">Todas</option>
            <option value="2">2 hóspedes</option>
            <option value="3">3 hóspedes</option>
            <option value="4">4 hóspedes</option>
            <option value="5">5 hóspedes</option>
          </select>
        </div>

        {/* Info */}
        <div className="qr-help">
          {entrada && saida
            ? "Status calculado para o período informado."
            : "🕒 Status atualizado em tempo real"}
        </div>

        {/* ===========================================================
            GRID DE QUARTOS
        =========================================================== */}
        {loading ? (
          <p>Carregando…</p>
        ) : (
          <div className="qr-grid">
            {visiveis.map((q, idx) => {
              const id = q.id ?? q.Id ?? idx;
              const numero = q.numero ?? q.Numero ?? id;
              const capacidade = q.capacidade ?? q.Capacidade ?? 2;
              const status = q.status ?? "Livre";
              const ocupado = status === "Ocupado";

              return (
                <div key={id} className="qr-room">
                  <div className="qr-roomHeader">
                    <div className="qr-roomTitle">Quarto {numero}</div>
                    <span className={classePill(status)}>
                      {status === "Manutencao" ? "Manutenção" : status}
                    </span>
                  </div>

                  <div className="qr-roomMeta">
                    {(q.tipo ?? q.Tipo ?? "Padrão")} • {capacidade} hóspedes
                  </div>

                  {ocupado && q.hospede && !entrada && !saida && (
                    <div className="qr-roomMeta" style={{ marginTop: 8 }}>
                      👤 {q.hospede.nome}
                      <br />
                      🗓️ Entrada: {formatarData(q.hospede.dataEntrada)}
                    </div>
                  )}

                  <div className="qr-actions">
                    {status === "Livre" ? (
                      <Link to={`/quartos/checkin/${id}`} className="qr-btn qr-btn--primary">
                        🛎️ Acomodar
                      </Link>
                    ) : (
                      <>
                        <button
                          className="qr-btn qr-btn--ghost"
                          disabled aria-disabled="true">
                          Indisponível
                        </button>

                        {(q.hospede?.hospedagemId) ? (
                          <Link
                            to={`/conta/${q.hospede.hospedagemId}`}
                            className="qr-btn qr-btn--danger"
                            style={{ marginLeft: 8 }}>
                            💳 Encerrar
                          </Link>
                        ) : (
                          <button
                            className="qr-btn qr-btn--danger"
                            style={{ marginLeft: 8 }}
                            onClick={() => irParaEncerramento(q)}>
                            💳 Encerrar
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===========================================================
   EXPORT COM ERROR BOUNDARY
=========================================================== */
export default function Quartos() {
  return (
    <ErrorBoundary>
      <QuartosInner />
    </ErrorBoundary>
  );
}

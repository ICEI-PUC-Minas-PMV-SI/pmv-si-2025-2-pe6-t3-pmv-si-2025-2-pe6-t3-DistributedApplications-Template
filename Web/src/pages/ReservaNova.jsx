import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./reservas.css";
import { buscarQuartosLivres, criarReserva } from "../services/reservas";


export default function ReservaNova() {
  const [hospedeNome, setHospedeNome] = useState("");
  const [hospedeDocumento, setHospedeDocumento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [qtdeHospedes, setQtdeHospedes] = useState(2);

  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");

  const [quartoId, setQuartoId] = useState("");
  const [quartos, setQuartos] = useState([]);
  const [carregandoQuartos, setCarregandoQuartos] = useState(false);

  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  // Carrega quartos livres quando datas/capacidade mudarem
  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setQuartos([]);
      setQuartoId(""); // limpa seleção ao trocar filtros

      if (!dataEntrada || !dataSaida) return;
      setCarregandoQuartos(true);
      try {
        const livres = await buscarQuartosLivres({
          entrada: dataEntrada,                       // YYYY-MM-DD
          saida: dataSaida,                           // YYYY-MM-DD
          hospedes: Number(qtdeHospedes || 1),
        });
        if (!cancelado) setQuartos(livres || []);
      } catch {
        if (!cancelado) setQuartos([]);
      } finally {
        if (!cancelado) setCarregandoQuartos(false);
      }
    }

    carregar();
    return () => { cancelado = true; };
  }, [dataEntrada, dataSaida, qtdeHospedes]);

  function validar() {
    if (!hospedeNome.trim()) return "Informe o nome do hóspede.";
    if (!dataEntrada || !dataSaida) return "Informe as datas de entrada e saída.";
    if (new Date(dataSaida) <= new Date(dataEntrada)) return "A data de saída deve ser após a entrada.";
    if (!quartoId) return "Selecione um quarto disponível.";
    return "";
  }

  async function aoSalvar(e) {
    e.preventDefault();
    setErro(""); setOk("");

    const msg = validar();
    if (msg) return setErro(msg);

    try {
      setSalvando(true);
      await criarReserva({
        hospedeNome,
        hospedeDocumento,
        telefone,
        qtdeHospedes: Number(qtdeHospedes),
        dataEntrada,          
        dataSaida,
        quartoId,
      });
      setOk("Reserva criada com sucesso!");
      setTimeout(() => navigate("/reservas", { replace: true }), 700);
    } catch (err) {
      const detail = err?.response?.data?.mensagem || err?.message || "Falha ao criar reserva.";
      setErro(detail);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="rr-root">
      <div className="rr-card">
        <div className="rr-header">
          <h2 className="rr-title">➕ Nova reserva</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <Link to="/reservas" className="rr-link">← Voltar</Link>
          </div>
        </div>

        {ok &&  <div className="rr-toast rr-toast--ok">{ok}</div>}
        {erro && <div className="rr-toast rr-toast--erro">{erro}</div>}

        <form className="rr-form" onSubmit={aoSalvar} noValidate>
          <div className="rr-grid">
            <div className="rr-col-6">
              <label className="rr-label">Hóspede *</label>
              <input className="rr-input" value={hospedeNome} onChange={(e)=>setHospedeNome(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="rr-col-3">
              <label className="rr-label">Documento</label>
              <input className="rr-input" value={hospedeDocumento} onChange={(e)=>setHospedeDocumento(e.target.value)} placeholder="CPF/RG" />
            </div>
            <div className="rr-col-3">
              <label className="rr-label">Telefone</label>
              <input className="rr-input" value={telefone} onChange={(e)=>setTelefone(e.target.value)} placeholder="(xx) xxxxx-xxxx" />
            </div>

            <div className="rr-col-3">
              <label className="rr-label">Entrada *</label>
              <input className="rr-input" type="date" value={dataEntrada} onChange={(e)=>setDataEntrada(e.target.value)} />
              <div className="rr-help">Check-in</div>
            </div>
            <div className="rr-col-3">
              <label className="rr-label">Saída *</label>
              <input className="rr-input" type="date" value={dataSaida} onChange={(e)=>setDataSaida(e.target.value)} />
              <div className="rr-help">Check-out</div>
            </div>
            <div className="rr-col-3">
              <label className="rr-label">Hóspedes</label>
              <input className="rr-input" type="number" min="1" value={qtdeHospedes} onChange={(e)=>setQtdeHospedes(e.target.value)} />
            </div>

            <div className="rr-col-12">
              <label className="rr-label">Quartos disponíveis *</label>

              {!dataEntrada || !dataSaida ? (
                <div className="rr-help">Informe as datas para listar a disponibilidade.</div>
              ) : carregandoQuartos ? (
                <div className="rr-help">Carregando quartos…</div>
              ) : quartos.length === 0 ? (
                <div className="rr-empty">Nenhum quarto disponível para o período selecionado.</div>
              ) : (
                <>
                  <div className="rr-rooms-grid">
                    {quartos.map((q) => {
                      const titulo = q.numero || q.nome || `Quarto ${q.id ?? ""}`.trim();
                      const selected = String(quartoId) === String(q.id);
                      return (
                        <div
                          key={q.id}
                          className={"rr-room-card" + (selected ? " rr-room-card--selected" : "")}
                          role="button"
                          tabIndex={0}
                          onClick={() => setQuartoId(String(q.id))}
                          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setQuartoId(String(q.id))}
                        >
                          <div className="rr-room-head">
                            <div className="rr-room-title">{titulo}</div>
                            <input type="radio" name="quarto" checked={selected} onChange={() => setQuartoId(String(q.id))} />
                          </div>
                          <div className="rr-room-meta">
                            <span>{q.capacidade ? `${q.capacidade} hóspedes` : "—"}</span>
                            {q.tipo && <span>• {q.tipo}</span>}
                          </div>
                          <button type="button" className="rr-btn rr-btn--outline" onClick={(e) => { e.stopPropagation(); setQuartoId(String(q.id)); }}>
                            Selecionar
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Select acessível opcional */}
                  <div style={{ marginTop: 8 }}>
                    <select className="rr-select" value={quartoId} onChange={(e)=>setQuartoId(e.target.value)}>
                      <option value="">Selecione…</option>
                      {quartos.map((q) => (
                        <option key={q.id} value={q.id}>
                          {(q.numero || q.nome || `Quarto ${q.id}`) + " — " + (q.capacidade ? `${q.capacidade} hóspedes` : "—")}
                        </option>
                      ))}
                    </select>
                    <div className="rr-help">Quartos livres para o período.</div>
                  </div>
                </>
              )}
            </div>

            <div className="rr-col-12" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Link to="/reservas" className="rr-btn rr-btn--ghost">Cancelar</Link>
              <button className="rr-btn rr-btn--primary" disabled={salvando}>
                {salvando ? "Salvando…" : "Salvar reserva"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
        .rr-rooms-grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:12px; margin-top:6px; }
        .rr-room-card{ border:1px solid var(--borda,#E8E1D6); background:#fff; border-radius:16px; padding:12px; box-shadow:0 4px 12px rgba(0,0,0,.05); cursor:pointer; transition:.18s; display:flex; flex-direction:column; gap:8px; }
        .rr-room-card:hover{ transform:translateY(-1px); box-shadow:0 10px 22px rgba(0,0,0,.10); }
        .rr-room-card--selected{ outline:2px solid var(--oliva,#3D5B3D); }
        .rr-room-head{ display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .rr-room-title{ font-weight:600; }
        .rr-room-meta{ color:#555; font-size:.92rem; display:flex; gap:6px; flex-wrap:wrap; }
        .rr-empty{ padding:10px; border:1px dashed #ccc; border-radius:12px; color:#555; background:#fafafa; }
        `}
      </style>
    </div>
  );
}

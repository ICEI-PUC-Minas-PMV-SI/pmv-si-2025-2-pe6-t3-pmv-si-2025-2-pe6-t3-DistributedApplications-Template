// src/pages/Pedidos.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPedidos, criarPedido } from "../services/pedidos";
import { listarReservasAtivasAgora, listarReservas } from "../services/reservas";
import { listarProdutos } from "../services/produtos";
import "./pedidos.css";

import pedidoIcon from "../assets/pedido.png";
import addIcon from "../assets/+.png";

export default function Pedidos() {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [reservasAtivas, setReservasAtivas] = useState([]);
  const [reservasTodas, setReservasTodas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [reservationId, setReservationId] = useState("");
  const [itens, setItens] = useState([{ productId: "", quantity: 1 }]);

  async function carregarTudo() {
    setLoading(true);
    setErro("");
    try {
      const [pedRes, resAtivas, resTodas, prodsRes] = await Promise.allSettled([
        getPedidos(),
        listarReservasAtivasAgora(),
        listarReservas(),
        listarProdutos(),
      ]);

      if (pedRes.status === "fulfilled") {
        setPedidos(Array.isArray(pedRes.value) ? pedRes.value : []);
      } else {
        console.error("Falha ao carregar pedidos:", pedRes.reason);
      }

      if (resAtivas.status === "fulfilled") {
        const arr = Array.isArray(resAtivas.value) ? resAtivas.value : [];
        setReservasAtivas(arr);
        if (!reservationId && arr.length) {
          const primeiroId = arr[0].id ?? arr[0].Id ?? "";
          setReservationId(primeiroId);
        }
      } else {
        console.error("Falha ao carregar reservas ativas:", resAtivas.reason);
      }

      if (resTodas.status === "fulfilled") {
        setReservasTodas(Array.isArray(resTodas.value) ? resTodas.value : []);
      } else {
        console.error("Falha ao carregar todas as reservas:", resTodas.reason);
      }

      if (prodsRes.status === "fulfilled") {
        const lista = Array.isArray(prodsRes.value) ? prodsRes.value : [];
        setProdutos(lista);
      } else {
        console.warn("Produtos não carregados:", prodsRes.reason);
      }

      if (pedRes.status === "rejected" || resAtivas.status === "rejected") {
        setErro("Erro ao carregar dados. Verifique conexão e autenticação.");
      }
    } catch (e) {
      console.error("carregarTudo falhou:", e);
      setErro("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregarTudo(); /* eslint-disable-next-line */ }, []);

  // Mapas auxiliares
  const produtosById = useMemo(() => {
    const map = new Map();
    produtos.forEach((p) => map.set(Number(p.id ?? p.Id), p));
    return map;
  }, [produtos]);

  const reservasById = useMemo(() => {
    const map = new Map();
    (reservasTodas ?? []).forEach((r) => {
      const id = Number(r.id ?? r.Id);
      if (!id) return;
      const hospede = r.hospedeNome ?? r.HospedeNome ?? "—";
      const quartoId = r.quartoId ?? "—";
      const checkin = r.dataEntrada ?? r.DataEntrada ?? r.checkinAt ?? r.CheckinAt;
      const checkout = r.dataSaida ?? r.DataSaida ?? r.checkoutAt ?? r.CheckoutAt;
      map.set(id, { hospede, quartoId, checkin, checkout });
    });
    return map;
  }, [reservasTodas]);

  // Totais
  const totalEstimado = useMemo(() => {
    return itens.reduce((acc, it) => {
      const prod = produtosById.get(Number(it.productId));
      const preco = Number(prod?.preco ?? prod?.Preco ?? 0);
      const qtd = Number(it.quantity || 0);
      return acc + preco * qtd;
    }, 0);
  }, [itens, produtosById]);

  // Helpers
  const formatarData = (data) => {
    if (!data) return "N/A";
    const d = new Date(data);
    return isNaN(+d) ? "N/A" : d.toLocaleDateString("pt-BR");
  };
  const formatarMoeda = (v) =>
    Number(v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const formatarStatus = (status) => {
    const s = String(status ?? "").toLowerCase();
    if (s.includes("pending") || s === "0") return "Aguardando";
    if (s.includes("process") || s === "1") return "Em processo";
    if (s.includes("final") || s === "2") return "Finalizado";
    return status ?? "—";
  };

  // Itens
  const addItem = () => setItens((prev) => [...prev, { productId: "", quantity: 1 }]);
  const removeItem = (idx) => setItens((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx, key, value) =>
    setItens((prev) => prev.map((it, i) => (i === idx ? { ...it, [key]: value } : it)));

  // Submit
  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      if (!reservationId) throw new Error("Selecione um hóspede acomodado.");
      const itensValidos = itens.filter((i) => i.productId && Number(i.quantity) > 0);
      if (!itensValidos.length) throw new Error("Adicione ao menos 1 item válido.");

      await criarPedido({
        reservationId: Number(reservationId),
        items: itensValidos.map((i) => ({
          productId: Number(i.productId),
          quantity: Number(i.quantity),
        })),
      });

      setItens([{ productId: "", quantity: 1 }]);
      await carregarTudo();
    } catch (e) {
      setErro(e?.message || "Erro ao salvar o pedido.");
    }
  }

  return (
    <div className="pedidos-page">
      <div className="pedidos-card">
        <header className="pedidos-header">
          <h2 className="pedidos-title">
            <img src={pedidoIcon} alt="Pedidos" className="title-icon" />
            Pedidos
          </h2>
          <div className="header-actions">
            <button type="button" className="btn btn-ghost" onClick={carregarTudo} disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
            <Link to="/" className="link-back">← Voltar</Link>
          </div>
        </header>

        {loading && <p className="info">Carregando...</p>}
        {erro && <p className="error">{erro}</p>}

        {/* Novo Pedido */}
        <section className="section">
          <h3 className="section-title">
            <img src={addIcon} alt="" className="btn-icon" /> Novo Pedido
          </h3>

          <form className="pedido-form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Hóspede (reserva ativa)</label>
              <select
                className="select"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              >
                <option value="">Selecione...</option>
                {reservasAtivas.map((r) => {
                  const id = r.id ?? r.Id;
                  const hospede = r.hospedeNome;
                  const quarto = r.quartoId || "—";
                  return (
                    <option key={id} value={id}>
                      #{id} • Quarto {quarto} • {hospede}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="field">
              <label className="label">Itens</label>

              {itens.map((it, idx) => {
                const prod = produtosById.get(Number(it.productId));
                const preco = Number(prod?.preco ?? prod?.Preco ?? 0);

                return (
                  <div className="item-row" key={idx}>
                    <select
                      className="select"
                      value={it.productId}
                      onChange={(e) => updateItem(idx, "productId", e.target.value)}
                    >
                      <option value="">Selecione o alimento…</option>
                      {produtos.map((p) => (
                        <option key={p.id ?? p.Id} value={p.id ?? p.Id}>
                          {(p.nome ?? p.Nome) + " - " + formatarMoeda(p.preco ?? p.Preco ?? 0)}
                        </option>
                      ))}
                    </select>

                    <input
                      className="input-qty"
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                    />

                    <div className="item-subtotal">
                      <span>{it.quantity} x {formatarMoeda(preco)}</span>
                    </div>

                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeItem(idx)}
                      title="Remover"
                      aria-label={`Remover item ${idx + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}

              <button type="button" className="btn btn-primary" onClick={addItem}>
                <img src={addIcon} alt="" className="btn-icon" />
                Adicionar item
              </button>
            </div>

            <div className="total">
              Total estimado: <strong>&nbsp;{formatarMoeda(totalEstimado)}</strong>
            </div>

            <div className="actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => { setReservationId(""); setItens([{ productId: "", quantity: 1 }]); }}
              >
                Limpar
              </button>
              <button type="submit" className="btn btn-success">
                Salvar Pedido
              </button>
            </div>
          </form>
        </section>

        {/* Lista de pedidos */}
        <section className="section">
          <h3 className="section-title">Pedidos cadastrados</h3>

          {!loading && !erro && pedidos.length === 0 && (
            <p className="info">Nenhum pedido registrado ainda.</p>
          )}

          {!loading && pedidos.length > 0 && (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Reserva</th>
                    <th>Quarto</th>
                    <th>Hóspede</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => {
                    const id = p.id ?? p.Id;
                    const resId = Number(p.reservationId ?? p.ReservationId);
                    const res = reservasById.get(resId);
                    const quarto = res?.quartoId ?? "—";
                    const hospede = res?.hospede ?? p.hospedeNome ?? p.HospedeNome ?? "—";
                    const checkin = res?.checkin ?? p.checkInDate ?? p.CheckInDate;
                    const checkout = res?.checkout ?? p.checkOutDate ?? p.CheckOutDate;
                    const total = p.total ?? p.Total;

                    return (
                      <tr key={id}>
                        <td>#{id}</td>
                        <td>#{resId || "—"}</td>
                        <td>#{quarto}</td>
                        <td>{hospede}</td>
                        <td>{formatarData(checkin)}</td>
                        <td>{formatarData(checkout)}</td>
                        <td>{formatarMoeda(total)}</td>
                        <td>{formatarStatus(p.status ?? p.Status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { criarPedido } from "../services/pedidos"; 

export default function PedidoCreate() {
  const navigate = useNavigate();

  // Campos do OrderCreateDto
  const [customerName, setCustomerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState(""); 
  const [checkOutDate, setCheckOutDate] = useState(""); 
  const [total, setTotal] = useState("0.00"); 


  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [salvando, setSalvando] = useState(false);

  function valido() {
    if (!customerName.trim()) return "Informe o nome do Hóspede.";
    if (!roomId) return "Informe o número do Quarto.";
    if (Number.isNaN(Number(roomId)) || Number(roomId) <= 0) return "Número do Quarto inválido.";
    if (!checkInDate) return "Informe a data de Check-in.";
    if (!checkOutDate) return "Informe a data de Check-out.";
    
    if (new Date(checkOutDate) <= new Date(checkInDate)) return "A data de Check-out deve ser posterior à data de Check-in.";

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
      
      const dadosDoPedido = {
        customerName,
        roomId: Number(roomId),
        checkInDate: new Date(checkInDate).toISOString(),
        checkOutDate: new Date(checkOutDate).toISOString(),
      };

      await criarPedido(dadosDoPedido); 
      setOk("Pedido criado com sucesso");

      setTimeout(() => {
        navigate("/pedidos", {
          replace: true,
          state: { toast: "Pedido criado com sucesso!" },
        });
      }, 800);
    } catch (err) {
      const detail =
        err?.response?.data?.mensagem ||
        err?.response?.data?.message ||
        err?.message ||
        "Falha ao criar pedido.";
      setErro(detail);
    } finally {
      setSalvando(false);
    }
  }

  const styles = {
    wrapper: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#f5f6f8", padding: 16 },
    card: { width: 720, maxWidth: "100%", background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,.08)" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 },
    linkSec: { fontSize: 14, color: "#0b5ed7", textDecoration: "none" },
    form: { display: "grid", gap: 12, marginTop: 8 },
    row: { display: "grid", gap: 6 },
    label: { fontSize: 14, color: "#222" },
    input: { padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, outline: "none", background: "#fff" },
    button: { padding: "10px 14px", borderRadius: 8, border: "none", background: "#0b5ed7", color: "#fff", cursor: "pointer", minWidth: 120 },
    btnGhost: { padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#333", textDecoration: "none", minWidth: 120, textAlign: "center" },
    error: { background: "#fde2e1", color: "#b21f1f", padding: "8px 10px", borderRadius: 8, fontSize: 13 },
    success: { background: "#e6f6e6", color: "#1b7f1b", padding: "8px 10px", borderRadius: 8, fontSize: 13 },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>➕ Nova Pedido</h2>
          <Link to="/pedidos" style={styles.linkSec}>
            ← Voltar
          </Link>
        </div>

        {erro && <div style={styles.error}>{erro}</div>}
        {ok && <div style={styles.success}>{ok}</div>}

        <form onSubmit={aoSalvar} style={styles.form}>
          <div style={styles.row}>
            <label style={styles.label}>Nome do Hóspede *</label>
            <input
              style={styles.input}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ex.: João da Silva"
              autoFocus
            />
          </div>

          <div style={styles.row}>
            <label style={styles.label}>Número do Quarto *</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Ex.: 101"
            />
          </div>

          <div style={styles.row}>
            <label style={styles.label}>Data de Check-in *</label>
            <input
              style={styles.input}
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
          
          <div style={styles.row}>
            <label style={styles.label}>Data de Check-out *</label>
            <input
              style={styles.input}
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>

          <input type="hidden" name="Total" value={total} /> 

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
            <Link to="/pedidos" style={styles.btnGhost}>Cancelar</Link>
            <button type="submit" style={styles.button} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar Ordem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

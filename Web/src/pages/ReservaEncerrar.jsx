import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obterReserva, encerrarHospedagem } from "../services/reservas";

export default function ReservaEncerrar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // se não tiver id, evita erro e volta
    if (!id) {
      alert("Reserva não informada.");
      navigate("/quartos");
      return;
    }

    obterReserva(id)
      .then(setReserva)
      .catch(() => {
        alert("Reserva não encontrada.");
        navigate("/quartos");
      });
  }, [id, navigate]);

  async function handleConfirmar() {
    if (!id) return;

    const confirma = window.confirm(
      "Confirmar encerramento desta hospedagem?"
    );
    if (!confirma) return;

    setBusy(true);
    try {
      await encerrarHospedagem(id);
      alert("Hospedagem encerrada com sucesso.");
      navigate("/quartos");
    } catch (e) {
      console.error(e);
      alert("Falha ao encerrar. Veja o Console.");
    } finally {
      setBusy(false);
    }
  }

  if (!reserva) {
    return <div style={{ padding: 16 }}>Carregando…</div>;
  }

  const entrada = reserva.checkinAt
    ? new Date(reserva.checkinAt).toLocaleString("pt-BR")
    : "-";

  return (
    <div className="p-4">
      <h2>Encerrar Hospedagem</h2>

      <p>
        <strong>Quarto:</strong> {reserva.roomNumber}
      </p>
      <p>
        <strong>Hóspede:</strong> {reserva.guestName}
      </p>
      <p>
        <strong>Entrada:</strong> {entrada}
      </p>

      <button
        type="button"
        disabled={busy}
        onClick={handleConfirmar}
        style={{ marginRight: 8 }}
      >
        {busy ? "Encerrando..." : "Confirmar encerramento"}
      </button>

      <button
        type="button"
        onClick={() => navigate(-1)}
        disabled={busy}
      >
        Voltar
      </button>
    </div>
  );
}

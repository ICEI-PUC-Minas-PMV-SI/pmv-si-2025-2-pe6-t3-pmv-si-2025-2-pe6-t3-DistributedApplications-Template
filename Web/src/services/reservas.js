// src/services/reservas.js
import { api } from "./api";

/* ============ helpers ============ */
const is404 = (e) => e?.response?.status === 404;

async function tentarGet(path, params) {
  try {
    const { data } = await api.get(path, params ? { params } : undefined);
    return Array.isArray(data) ? data : data?.items ?? data ?? null;
  } catch (e) {
    if (is404(e)) return null; // 404 = não existe, segue o fluxo
    throw e;
  }
}

const toLocalDateTime = (dateStr) => (dateStr ? `${dateStr}T00:00:00` : null);

// normalização de datas (independente do DTO)
function _getDates(r) {
  const entrada =
    r.dataEntrada ?? r.DataEntrada ?? r.checkinAt ?? r.CheckinAt ?? r.entrada ?? r.Entrada;
  const saida =
    r.dataSaida ?? r.DataSaida ?? r.checkoutAt ?? r.CheckoutAt ?? r.saida ?? r.Saida;
  return { entrada, saida };
}
function _isActiveNow(r) {
  const { entrada, saida } = _getDates(r);
  const now = new Date();
  const dIn = entrada ? new Date(entrada) : null;
  const dOut = saida ? new Date(saida) : null;
  if (!dIn || isNaN(dIn)) return false;
  return dIn <= now && (!dOut || dOut > now);
}

/* ============ consultas ============ */

/** Lista reservas (com filtros opcionais) */
export async function listarReservas({ q, status } = {}) {
  const params = {};
  if (q) params.q = q;
  if (status) params.status = status; // mande undefined para “Todas”
  const { data } = await api.get("/api/Reservations", { params });
  return Array.isArray(data) ? data : data?.items ?? [];
}

/** Busca quartos livres para um período */
export async function buscarQuartosLivres({ entrada, saida, hospedes = 1 }) {
  const capacidade = Number(hospedes || 1);
  return (
    (await tentarGet("/api/Reservations/disponibilidade", {
      dataEntrada: entrada, // YYYY-MM-DD
      dataSaida: saida,     // YYYY-MM-DD
      capacidade,
    })) ||
    (await tentarGet("/api/Rooms/disponiveis", {
      dataEntrada: entrada,
      dataSaida: saida,
      capacidade,
    })) ||
    []
  );
}

/** Hospedagem ativa por quarto (tolerante a 404) */
export async function obterHospedagemAtivaPorQuarto(quartoId) {
  return (
    (await tentarGet(`/api/Reservations/ativa-por-quarto/${quartoId}`)) ||
    (await tentarGet(`/api/Reservations/ativa-por-quarto`, { quartoId })) ||
    (await tentarGet(`/api/Hospedagens/ativa-por-quarto/${quartoId}`)) ||
    null
  );
}

/** Detalhe da reserva */
export async function obterReserva(id) {
  return await tentarGet(`/api/Reservations/${id}`);
}

/** ✅ Reservas ativas neste momento (usada por Pedidos.jsx) */
export async function listarReservasAtivasAgora() {
  // tenta endpoint dedicado, se existir no backend
  const diretas =
    (await tentarGet("/api/Reservations/ativas-agora")) ||
    (await tentarGet("/api/Reservas/ativas-agora"));
  if (Array.isArray(diretas)) return diretas;

  // fallback: lista todas e filtra por período/status
  const todos = await listarReservas();
  return (todos ?? []).filter((r) => {
    const s = (r.status ?? r.Status ?? "").toString().toLowerCase();
    if (s.includes("cancel")) return false;
    return _isActiveNow(r);
  });
}

/* ============ ações ============ */

/** Criar reserva */
export async function criarReserva({
  hospedeNome,
  hospedeDocumento,
  telefone,
  qtdeHospedes,
  dataEntrada, // YYYY-MM-DD
  dataSaida,   // YYYY-MM-DD
  quartoId,
}) {
  const payload = {
    hospedeNome,
    hospedeDocumento,
    telefone,
    quantidadeHospedes: Number(qtdeHospedes || 1),
    quartoId: Number(quartoId),
    dataEntrada: toLocalDateTime(dataEntrada),
    dataSaida: toLocalDateTime(dataSaida),
  };

  try {
    const { data } = await api.post("/api/Reservations", payload);
    return data ?? true;
  } catch (e) {
    if (!is404(e)) throw e;
    try {
      const { data } = await api.post("/api/Reservas", payload);
      return data ?? true;
    } catch (e2) {
      if (!is404(e2)) throw e2;
      const { data } = await api.post("/api/Bookings", payload);
      return data ?? true;
    }
  }
  
}

/** Encerrar/checkout */
export async function encerrarHospedagem(id) {
  await api.post(`/api/Reservations/${id}/encerrar`);
  return true;
}

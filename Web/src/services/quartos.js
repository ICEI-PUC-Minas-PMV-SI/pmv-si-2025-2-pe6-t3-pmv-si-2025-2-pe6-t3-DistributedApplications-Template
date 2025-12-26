// src/services/quartos.js
import { api } from "./api";

/** Lista quartos com status (e hóspede, se houver) calculados AGORA */
export async function listarQuartos() {
  const { data } = await api.get("/api/Rooms/with-guest");
  return Array.isArray(data) ? data : data?.items ?? data ?? [];
}

/** GET /api/Rooms/{id} */
export async function obterQuarto(id) {
  const { data } = await api.get(`/api/Rooms/${Number(id)}`);
  // backend retorna: { id, numero, capacidade, status }
  return data;
}

/** (opcional) POST /api/Rooms */
export async function criarQuarto(payload) {
  const { data } = await api.post("/api/Rooms", payload);
  return data;
}

/** Check-in = POST /api/Reservations com QuartoId */
export async function acomodarHospede({
  quartoId,
  nomeHospede,
  documento,
  adultos,
  criancas,
  dataEntrada,
  dataSaidaPrevista,
}) {
  const dto = {
    HospedeNome: nomeHospede,
    HospedeDocumento: documento || null,
    Telefone: null,
    QtdeHospedes: Number(adultos || 0) + Number(criancas || 0),
    DataEntrada: dataEntrada,       // ISO (use toISOString no chamador)
    DataSaida: dataSaidaPrevista,   // ISO
    QuartoId: Number(quartoId),
  };
  const { data } = await api.post("/api/Reservations", dto);
  return data;
}

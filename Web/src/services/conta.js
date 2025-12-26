// src/services/conta.js
import { api } from "./api";

/* Helpers -------------------------------------------------- */

const is404 = (e) => e?.response?.status === 404;

// tenta pegar propriedade em camelCase ou PascalCase
function pick(obj, camel, pascal) {
  if (!obj) return undefined;
  if (obj[camel] !== undefined) return obj[camel];
  if (obj[pascal] !== undefined) return obj[pascal];
  return undefined;
}

// calcula quantidade de noites entre duas datas (>= 1)
function calcularNoites(dataEntradaIso, dataSaidaIso) {
  if (!dataEntradaIso) return 1;
  const dIn = new Date(dataEntradaIso);
  const dOut = dataSaidaIso ? new Date(dataSaidaIso) : new Date();
  if (Number.isNaN(+dIn) || Number.isNaN(+dOut)) return 1;

  const ms = dOut.getTime() - dIn.getTime();
  const dias = ms / (1000 * 60 * 60 * 24);
  const arred = Math.max(1, Math.round(dias || 1));
  return arred;
}

/* Normalização do payload da API para o formato da tela ----- */

function montarDadosConta(reservaRaw, checkoutRaw) {
  const r = reservaRaw || {};
  const c = checkoutRaw || {};

  const reservaId =
    pick(c, "reservationId", "ReservationId") ??
    pick(r, "id", "Id") ??
    null;

  const nomeHospede =
    (pick(c, "customerName", "CustomerName") ??
      pick(r, "hospedeNome", "HospedeNome") ??
      "").trim() || "—";

  const dataEntrada =
    pick(r, "dataEntrada", "DataEntrada") ?? null;

  const dataSaida =
    pick(r, "dataSaida", "DataSaida") ?? null;

  const totalHospedagem =
    pick(c, "totalHospedagem", "TotalHospedagem") ?? 0;

  const totalConsumo =
    pick(c, "totalConsumoRestaurante", "TotalConsumoRestaurante") ?? 0;

  const totalGeral =
    pick(c, "valorFinalDaConta", "ValorFinalDaConta") ??
    (Number(totalHospedagem) + Number(totalConsumo));

  const noites = calcularNoites(dataEntrada, dataSaida);
  const tarifaDiaria =
    noites > 0 ? Number(totalHospedagem) / noites : Number(totalHospedagem);

  // Flatten dos itens de pedidos
  const detalhesPedidos =
    pick(c, "detalhesDosPedidos", "DetalhesDosPedidos") ?? [];

  const itens = [];
  if (Array.isArray(detalhesPedidos)) {
    detalhesPedidos.forEach((ped) => {
      const itensPed = ped.items ?? ped.Itens ?? ped.Items ?? [];
      if (Array.isArray(itensPed)) {
        itensPed.forEach((it) => {
          const precoUnitario =
            pick(it, "precoUnitario", "PrecoUnitario") ?? 0;
          const quantidade =
            pick(it, "quantidade", "Quantidade") ?? 1;
          const subtotal =
            pick(it, "subtotal", "Subtotal") ??
            Number(precoUnitario) * Number(quantidade);

          itens.push({
            id:
              pick(it, "produtoId", "ProdutoId") ??
              pick(it, "id", "Id") ??
              null,
            produto:
              pick(it, "nomeProduto", "NomeProduto") ??
              pick(it, "produto", "Produto") ??
              "—",
            quantidade,
            precoUnitario,
            subtotal,
          });
        });
      }
    });
  }

  return {
    reservaId,
    quarto: {
      // ReservationDto.Quarto (string label) → numero
      numero: pick(r, "quarto", "Quarto") ?? "-",
      // o layout já tem fallback: "Padrão · 2 hóspedes"
      tipo: undefined,
      capacidade: undefined,
    },
    hospede: {
      nome: nomeHospede,
      documento:
        pick(r, "hospedeDocumento", "HospedeDocumento") ?? null,
      telefone: pick(r, "telefone", "Telefone") ?? null,
    },
    datas: {
      dataEntrada,
      // como não temos previsão separada, usamos a dataSaida da reserva (se houver)
      dataSaidaPrevista: dataSaida,
      dataSaidaReal: dataSaida,
    },
    valores: {
      tarifaDiaria,
      noites,
      totalDiarias: Number(totalHospedagem),
      totalPedidos: Number(totalConsumo),
      totalGeral: Number(totalGeral),
    },
    itens,
  };
}

/* Services exportados para a tela --------------------------- */

/**
 * Resolve a reserva ativa para um quarto.
 * Usado quando a tela é acessada com ?roomId=123.
 */
export async function resolverReservaAtiva(roomId) {
  if (!roomId) return null;
  try {
    const { data } = await api.get(
      `/api/Reservations/ativa-por-quarto/${roomId}`
    );
    // API pode devolver { id, ... } ou { reservaId, ... }
    return (
      pick(data, "id", "Id") ??
      pick(data, "reservaId", "ReservaId") ??
      null
    );
  } catch (e) {
    if (is404(e)) return null;
    throw e;
  }
}

/**
 * Obtém os dados da conta (reserva + checkout) já normalizados
 * para o formato que ContaHospedagem.jsx espera.
 */
export async function obterCheckout(reservaId) {
  if (!reservaId) return null;

  try {
    const [reservaResp, checkoutResp] = await Promise.all([
      api.get(`/api/Reservations/${reservaId}`),
      api.get(`/api/Reservations/${reservaId}/checkout`),
    ]);

    return montarDadosConta(reservaResp.data, checkoutResp.data);
  } catch (e) {
    if (is404(e)) return null;
    throw e;
  }
}

/**
 * Encerrar a conta: POST /api/Reservations/{id}/checkout
 */
export async function encerrarConta(reservaId, payload = {}) {
  if (!reservaId) throw new Error("reservaId é obrigatório.");
  await api.post(`/api/Reservations/${reservaId}/checkout`, payload);
  return true;
}

// src/services/pedidos.js
import { api } from "./api";

/** Lista pedidos */
export async function getPedidos() {
  const { data } = await api.get("/api/Order");
  return Array.isArray(data) ? data : [];
}

/** Cria um pedido */
export async function criarPedido(payload) {
  const dto = {
    ReservationId: payload.reservationId,
    Items: payload.items.map((i) => ({
      ProdutoId: i.productId,
      Quantidade: i.quantity,
    })),
  };

  const { data } = await api.post("/api/Order", dto);
  return data;
}

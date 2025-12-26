import ApiProvider from "./apiProvider";
import { ReservationCheckoutRequestDTO, ReservationCheckoutResponseDTO, ReservationCreateRequestDTO, ReservationResponseDTO } from "./dto";

class Reservations {
    private provider: ApiProvider;
    
    constructor(apiProvider: ApiProvider) {
        this.provider = apiProvider;
    }

    async getAllReservations(hospedeNome = '', status = '') : Promise<ReservationResponseDTO[]> {
        const params = {
            q: hospedeNome,
            status: status
        }

        const result = await this.provider.httpRequest('reservations', 'GET', params);
        return result;
    }

    async createReservation(payload: ReservationCreateRequestDTO): Promise<ReservationResponseDTO> {
        const result = await this.provider.httpRequest('reservations', 'POST', payload);
        return result;
    }

    async getById(id: number): Promise<ReservationResponseDTO> {
        const result = await this.provider.httpRequest(`reservations/${id}`, 'GET');
        return result;
    }

    async getActiveByRoomId(roomId: number): Promise<ReservationResponseDTO | null> {
        const result = await this.provider.httpRequest(`reservations/ativa-por-quarto/${roomId}`, 'GET');
        return result;
    }

    async getAllActiveReservations() : Promise<ReservationResponseDTO[]> {
        const result = await this.provider.httpRequest('reservations/ativas-agora', 'GET');
        return result;
    }

    async getCheckout(reservationId: number): Promise<ReservationCheckoutResponseDTO> {
        const result = await this.provider.httpRequest(`reservations/${reservationId}/checkout`, 'GET');
        return result;
    }

    async checkout(reservationId: number, payload: ReservationCheckoutRequestDTO): Promise<void> {
        const result = await this.provider.httpRequest(`reservations/${reservationId}/checkout`, 'POST', payload);
        return result;
    }

    async getCheckoutByRoomId(roomId: number): Promise<ReservationCheckoutResponseDTO> {
        const result = await this.provider.httpRequest(`Rooms/${roomId}/checkout`, 'GET');
        return result;
    }

    async encerrarReservation(reservationId: number): Promise<void> {
        const result = await this.provider.httpRequest(`reservations/${reservationId}/encerrar`, 'POST');
        return result;
    }
}

export default Reservations;
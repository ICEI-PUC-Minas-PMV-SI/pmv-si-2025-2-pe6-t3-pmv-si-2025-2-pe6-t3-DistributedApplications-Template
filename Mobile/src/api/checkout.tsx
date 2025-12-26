import ApiProvider from "./apiProvider";

class Checkout {
    private provider: ApiProvider;

    constructor(apiProvider: ApiProvider) {
        this.provider = apiProvider;
    }

    async getByRoomId(roomId: number): Promise<any> {
        const result = await this.provider.httpRequest(`Rooms/${roomId}/checkout`, 'GET');
        return result;
    }

    async closeAccount(reservationId: number, params: { formaPagamento: string, observacao?: string | null }): Promise<any> {
        const dto = {
            FormaPagamento: params.formaPagamento,
            Observacao: params.observacao
        };

        const result = await this.provider.httpRequest(`Reservations/${reservationId}/checkout`, 'POST', dto);
        return result;
    }
}

export default Checkout;
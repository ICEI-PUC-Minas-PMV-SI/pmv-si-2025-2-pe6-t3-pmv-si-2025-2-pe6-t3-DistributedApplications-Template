import ApiProvider from "./apiProvider";
import { OrderCreateRequestDTO, OrderResponseDTO, OrderUpdateRequestDTO } from "./dto";

class Orders {
    private provider: ApiProvider;

    constructor(apiProvider: ApiProvider) {
        this.provider = apiProvider;
    }

    async getAllOrders(): Promise<OrderResponseDTO[]> {
        const result = await this.provider.httpRequest('order', 'GET');
        return result;
    }

    async getById(id: number): Promise<OrderResponseDTO> {
        const result = await this.provider.httpRequest(`order/${id}`, 'GET');
        return result;
    }

    async createOrder(payload: OrderCreateRequestDTO): Promise<void> {
        const result = await this.provider.httpRequest('order', 'POST', payload);
        return result;
    }

    async updateOrder(id: number, payload: OrderUpdateRequestDTO): Promise<void> {
        const result = await this.provider.httpRequest(`order/${id}`, 'PUT', payload);
        return result;
    }

    async deleteOrder(id: number): Promise<void> {
        const result = await this.provider.httpRequest(`order/${id}`, 'DELETE');
        return result;
    }
}

export default Orders;
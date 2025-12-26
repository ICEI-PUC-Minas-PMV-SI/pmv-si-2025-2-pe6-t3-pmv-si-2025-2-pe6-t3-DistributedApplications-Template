import ApiProvider from "./apiProvider";
import { ProductCreateRequestDTO, ProductResponseDTO } from "./dto";

class Products {
    private provider: ApiProvider;

    constructor(apiProvider: ApiProvider) {
        this.provider = apiProvider;
    }

    async getAllProducts(): Promise<ProductResponseDTO[]> {
        const result = await this.provider.httpRequest('Produto', 'GET');
        return result;
    }

    async getById(id: number): Promise<ProductResponseDTO> {
        const result = await this.provider.httpRequest(`Produto/${id}`, 'GET');
        return result;
    }

    async deleteProduct(id: number): Promise<void> {
        const result = await this.provider.httpRequest(`Produto/${id}`, 'DELETE');
        return result;
    }

    async createProdut(data: ProductCreateRequestDTO): Promise<void> {
        const result = await this.provider.httpRequest('Produto', 'POST', data);
        return result;
    }
}

export default Products;
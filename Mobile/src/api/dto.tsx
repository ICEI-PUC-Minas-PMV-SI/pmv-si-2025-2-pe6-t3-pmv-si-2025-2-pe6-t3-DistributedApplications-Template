export interface UserLoginRequestDTO {
    email: string;
    password: string;
}

export interface UserCreateRequestDTO {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserLoginResponseDTO {
    token: string;
    user: {
        nameid: string;
        unique_name: string;
        role: string;
    };
    exp: Date;
}

export interface RoomResponseDTO {
    id: number;
    numero: string;
    capacidade: number;
    status: string; // Livre, Ocupado 
}

export interface RoomResponseWithGuestDTO extends RoomResponseDTO {
    hospede: {
        nome: string;
        dataEntrada: string;
    } | null;
}

export interface OrderItemsResponseDTO {
    produtoId: number;
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
}

export interface OrderResponseDTO {
    id: number;
    customerName: string;
    reservationId: number;
    status: string;
    total: number;
    items: OrderItemsResponseDTO[];
}

export interface OrderCreateRequestDTO {
    reservationId: number;
    customerName: string;
    items: {
        produtoId: number;
        quantidade: number;
    }[];
}

export interface OrderUpdateRequestDTO {
    reservationId: number;
    customerName: string;
    status: string;
};

export interface ReservationCreateRequestDTO {
    hospedeNome: string;
    hospedeDocumento: string;
    telefone: string;
    qtdeHospedes: number;
    dataEntrada: Date;
    dataSaida: Date;
    quartoId: number;
    valorTotal: number;
}

export interface ReservationResponseDTO {
    id: number;
    hospedeNome: string;
    quarto: string;
    status: string; // Encerrada, Ativa etc
    dataEntrada: Date;
    dataSaida: Date;
}

export interface ReservationCheckoutRequestDTO {
    formaPagamento: string;
    observacao: string;
}

export interface ReservationCheckoutResponseDTO {
    reservationId: number;
    customerName: string;
    totalHospedagem: number;
    totalConsumoRestaurante: number;
    valorFinalDaConta: number;
    detalhesDosPedidos?: OrderResponseDTO[];
}

export interface ProductResponseDTO {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
}

export interface ProductCreateRequestDTO {
    nome: string;
    preco: number;
    estoque: number;
}
import ApiProvider from './apiProvider';
import Auth from './auth';
import Checkout from './checkout';
import Orders from './orders'; // 1. Importa a classe Orders
import Products from './products';
import Reservations from './reservations';
import Rooms from './rooms';

const provider = new ApiProvider("http://localhost:5210/api");

class Api {
    static auth = new Auth(provider);
    static rooms = new Rooms(provider);
    static reservations = new Reservations(provider);
    static products = new Products(provider);
    static checkout = new Checkout(provider);
    
    // 2. Adiciona o serviço de Pedidos (Orders)
    static orders = new Orders(provider); 

    // 3. Método para atualizar o token globalmente após o login
    // ESTE É O NOVO CÓDIGO CRÍTICO PARA CORRIGIR O 401
    static setAuthToken(token: string) {
        provider.setToken(token);
    }

    static getUserInfo() {
        return Auth.userInfo;
    }
}

export default Api;
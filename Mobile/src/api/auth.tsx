import { MMKV } from 'react-native-mmkv';
import { decodeJWT } from '../utils/jwt';
import ApiProvider from "./apiProvider";
import { UserCreateRequestDTO, UserLoginRequestDTO, UserLoginResponseDTO } from "./dto";

class Auth {
    static userInfo: UserLoginResponseDTO | null = null;
    private provider: ApiProvider;

    constructor(apiProvider: ApiProvider) {
        this.provider = apiProvider;
    }

    decodeToken(token: string): UserLoginResponseDTO {
        const JWTDecoded = decodeJWT(token);
        return {
            token: token,
            user: {
                nameid: JWTDecoded.nameid,
                unique_name: JWTDecoded.unique_name,
                role: JWTDecoded.role,
            },
            exp: new Date(JWTDecoded.exp * 1000),
        }
    }

    async isLoggedIn(mmkv: MMKV) : Promise<boolean> {
        const token = mmkv.getString('authToken');
        if(token) {
            Auth.userInfo = this.decodeToken(token);
            this.provider.setToken(token);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async login(mmkv: MMKV,credentials: UserLoginRequestDTO): Promise<UserLoginResponseDTO> {
        if(!credentials.email || !credentials.password) {
            return Promise.reject('Usuario ou senha não podem ser vazios');
        }

        const result = await this.provider.httpRequest('Auth/login', 'POST', credentials);
        if(!result) {
            return Promise.reject('Falha na autenticação');
        }

        Auth.userInfo = this.decodeToken(result.token);
        // console.log("Token recebido:", result.token);
        // console.log("Dados do usuário:", Auth.userInfo);
        mmkv.set('authToken', result.token);
        this.provider.setToken(result.token);
        return Promise.resolve(result);
    }

    async createUser(user: UserCreateRequestDTO): Promise<void> {
        await this.provider.httpRequest('Users', 'POST', user);
    }

    async logout(mmkv: MMKV): Promise<void> {
        mmkv.remove('authToken');
        Auth.userInfo = null;
        this.provider.setToken('');
        return Promise.resolve();
    }
}

export default Auth;
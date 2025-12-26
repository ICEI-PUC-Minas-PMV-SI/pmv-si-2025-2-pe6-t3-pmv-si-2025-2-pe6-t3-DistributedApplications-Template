class ApiProvider {
    private baseURL: string;
    private token: string = '';
    
    constructor(baseURL: string, token: string = '') {
        if(!baseURL) {
            throw new Error("Base URL não pode ser vazia.");
        }

        this.baseURL = baseURL;
        this.token = token;
    }

    setToken(token: string) {
        this.token = token;
    }

    async httpRequest(endpoint: string, method: string, data?: any) {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this.token}`
            },
        };
        
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        } else if (method === 'GET' && data) {
            const queryParams = new URLSearchParams(data).toString();
            endpoint += `?${queryParams}`;
        }
    
        const response = await fetch(`${this.baseURL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}

export default ApiProvider;
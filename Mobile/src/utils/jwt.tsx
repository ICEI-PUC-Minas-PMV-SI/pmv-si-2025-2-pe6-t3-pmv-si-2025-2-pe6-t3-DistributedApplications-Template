export function decodeJWT(token: string): any {
    const base64Decode = (str: string) => {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) {
            str += '=';
        }
        
        return decodeURIComponent(
            atob(str)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
    };

    const payload = token.split('.')[1];
    const decodedPayload = base64Decode(payload);
    return JSON.parse(decodedPayload);
}
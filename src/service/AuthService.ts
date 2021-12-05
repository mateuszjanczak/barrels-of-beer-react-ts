import {API_URL} from "./API";
import {ICredentials} from "../model/request/ICredentials";
import {IToken} from "../model/response/IToken";

class AuthService {

    API_URL = API_URL

    login(credentials: ICredentials): Promise<any> {
        return fetch(`${this.API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then((response) => {
                return response.json()
                    .then((json) => {
                        if (response.ok) {
                            return Promise.resolve(json)
                        }
                        return Promise.reject(json)
                    })
            })
            .then((token: IToken) => {
                this.saveToken(token.token)
                this.saveRefreshToken(token.refreshToken)
            })
    }

    refreshToken(): Promise<any> {
        const refreshToken = this.getRefreshToken()

        return fetch(`${this.API_URL}/auth/refreshToken/${refreshToken}`, {
            method: "POST"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('AuthService | refreshToken | Error')
                }
            })
            .then((token: IToken) => {
                this.saveToken(token.token)
                this.saveRefreshToken(token.refreshToken)
            })
            .catch(() => {
                this.logout()
            })
    }

    removeRefreshToken(refreshToken: string): Promise<any> {
        return fetch(`${this.API_URL}/auth/remove/${refreshToken}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok) {
                    return Promise.resolve()
                } else {
                    throw new Error('AuthService | removeRefreshToken | Error')
                }
            })
            .then(() => {
                this.logout()
            })
    }

    saveToken(token: string) {
        localStorage.setItem('token', token)
    }

    saveRefreshToken(refreshToken: string) {
        localStorage.setItem('refreshToken', refreshToken)
    }

    getHeaders(): string {
        if (localStorage.getItem('token') == null) {
            return ''
        } else {
            return 'Bearer ' + localStorage.getItem('token')
        }
    }

    getRefreshToken(): string {
        return localStorage.getItem('refreshToken') || '';
    }

    isLogged(): boolean {
        return localStorage.getItem('token') !== null && localStorage.getItem('refreshToken') !== null;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }
}

export default new AuthService()

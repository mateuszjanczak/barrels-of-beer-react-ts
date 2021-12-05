import {API_URL} from "./API";
import {ICredentials} from "../model/request/ICredentials";
import AuthService from "./AuthService";
import {IUser} from "../model/response/IUser";

class UserService {

    API_URL = API_URL

    createUser(credentials: ICredentials): Promise<any> {
        return fetch(`${this.API_URL}/users`, {
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
    }

    getUsers(): Promise<IUser[]> {
        return fetch(`${this.API_URL}/users`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('UserService | getUsers | Error')
                }
            })
    }

    getUser(userId: string): Promise<IUser> {
        return fetch(`${this.API_URL}/users/${userId}`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('UserService | getUser | Error')
                }
            })
    }

    enableUser(userId: string): Promise<Response> {
        return fetch(`${this.API_URL}/users/${userId}/enable`, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('UserService | enableUser | Error')
                }
            })
    }

    disableUser(userId: string): Promise<Response> {
        return fetch(`${this.API_URL}/users/${userId}/disable`, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('UserService | disableUser | Error')
                }
            })
    }

    removeUser(userId: string): Promise<Response> {
        return fetch(`${this.API_URL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('UserService | removeUser | Error')
                }
            })
    }
}

export default new UserService()

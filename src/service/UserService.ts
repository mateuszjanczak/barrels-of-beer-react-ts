import {ICredentials} from "../model/request/ICredentials";

class UserService {

    API_URL = "http://localhost:8080/api"

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
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('AuthService | createUser | Error')
                }
            })
    }
}

export default new UserService()
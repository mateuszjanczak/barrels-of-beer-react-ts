import {API_URL} from "./API";
import {INewTap} from "../model/request/INewTap";
import {ITap} from "../model/response/ITap";
import {ITapDetails} from "../model/request/ITapDetails";
import AuthService from "./AuthService";

class TapService {

    API_URL = API_URL

    getTap(id: number): Promise<ITap> {
        return fetch(`${this.API_URL}/taps/${id}`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('TapService | getTap | Error')
                }
            })
    }

    getTaps(): Promise<ITap[]> {
        return fetch(`${this.API_URL}/taps`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('TapService | getTaps | Error')
                }
            })
    }

    createTap(newTap: INewTap): Promise<Response> {
        return fetch(`${this.API_URL}/taps`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': AuthService.getHeaders()
            },
            body: JSON.stringify(newTap)
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

    setTap(tapId: number, tapDetails: ITapDetails): Promise<Response> {
        return fetch(`${this.API_URL}/taps/${tapId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': AuthService.getHeaders()
            },
            body: JSON.stringify(tapDetails)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('TapService | setTap | Error')
                }
            })
    }
}

export default new TapService()

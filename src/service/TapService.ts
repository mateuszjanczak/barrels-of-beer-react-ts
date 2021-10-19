import {INewTap} from "../model/request/INewTap";
import {ITap} from "../model/response/ITap";
import {ITapDetails} from "../model/request/ITapDetails";

class TapService {

    API_URL = "http://localhost:8080/api"

    getTap(id: number): Promise<ITap> {
        return fetch(`${this.API_URL}/taps/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('TapService | getTap | Error')
                }
            })
    }

    getTaps(): Promise<ITap[]> {
        return fetch(`${this.API_URL}/taps`)
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTap)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('TapService | createTap | Error')
                }
            })
    }

    setTap(tapDetails: ITapDetails): Promise<Response> {
        return fetch(`${this.API_URL}/taps`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
import {API_URL} from "./API";
import {ITemperatureEvent} from "../model/response/ITemperatureEvent";
import {IActionEvent} from "../model/response/IActionEvent";
import AuthService from "./AuthService";

class EventService {

    API_URL = API_URL

    getActionEvents(page: number): Promise<IActionEvent> {
        return fetch(`${this.API_URL}/events/action/${page}`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('EventService | getActionEvents | Error')
                }
            })
    }

    getTemperatureEvents(page: number): Promise<ITemperatureEvent> {
        return fetch(`${this.API_URL}/events/temperature/${page}`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('EventService | getTemperatureEvents | Error')
                }
            })
    }
}

export default new EventService()
import {ITemperatureEvent} from "../model/response/ITemperatureEvent";
import {IActionEvent} from "../model/response/IActionEvent";

class EventService {

    API_URL = "http://localhost:8080/api"

    getActionEvents(page: number): Promise<IActionEvent> {
        return fetch(`${this.API_URL}/events/action/${page}`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('EventService | getActionEvents | Error')
                }
            })
    }

    getTemperatureEvents(page: number): Promise<ITemperatureEvent> {
        return fetch(`${this.API_URL}/events/temperature/${page}`)
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
import {API_URL} from "./API";
import AuthService from "./AuthService";

class DocumentService {

    API_URL = API_URL

    downloadActionEventsURL(): Promise<void | Response> {
        return fetch(`${this.API_URL}/events/action/download`, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then(response => response.blob())
            .then(blob => {
                const file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            });
    }

    downloadTemperatureEventsURL(): Promise<void | Response> {
        return fetch(`${this.API_URL}/events/temperature/download`, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then(response => response.blob())
            .then(blob => {
                const file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            });
    }
}

export default new DocumentService()
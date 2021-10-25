import {API_URL} from "./API";

class DocumentService {

    API_URL = API_URL

    getDownloadActionEventsURL(): string {
        return `${this.API_URL}/events/action/download`
    }

    getDownloadTemperatureEventsURL(): string {
        return `${this.API_URL}/events/temperature/download`
    }
}

export default new DocumentService()
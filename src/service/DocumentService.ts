class DocumentService {

    API_URL = "http://localhost:8080/api"

    getDownloadActionEventsURL(): string {
        return `${this.API_URL}/events/action/download`
    }

    getDownloadTemperatureEventsURL(): string {
        return `${this.API_URL}/events/temperature/download`
    }
}

export default new DocumentService()
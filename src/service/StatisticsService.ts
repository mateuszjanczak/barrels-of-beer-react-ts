import {IRanking} from "../model/response/IRanking";

class StatisticsService {

    API_URL = "http://localhost:8080/api"

    getRanking(): Promise<IRanking[]> {
        return fetch(`${this.API_URL}/ranking`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('StatisticsService | getRanking | Error')
                }
            })
    }
}

export default new StatisticsService()
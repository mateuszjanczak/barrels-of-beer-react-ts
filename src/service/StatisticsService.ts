import {API_URL} from "./API";
import {IRanking} from "../model/response/IRanking";
import {IStatistics} from "../model/response/IStatistics";
import AuthService from "./AuthService";

class StatisticsService {

    API_URL = API_URL

    getRanking(): Promise<IRanking[]> {
        return fetch(`${this.API_URL}/ranking`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('StatisticsService | getRanking | Error')
                }
            })
    }

    getStatistics(from: string, to: string, interval: number): Promise<IStatistics[]> {
        return fetch(`${this.API_URL}/statistics/from/${from}/to/${to}/interval/${interval}`, {
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('StatisticsService | getStatistics | Error')
                }
            })
    }
}

export default new StatisticsService()
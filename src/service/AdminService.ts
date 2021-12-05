import {API_URL} from "./API";
import {TableType} from "../model/TableType";
import AuthService from "./AuthService";

class AdminService {

    API_URL = API_URL

    enableTap(tapId: number): Promise<Response> {
        return fetch(`${this.API_URL}/admin/tap/${tapId}/enable`, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('AdminService | enableTap | Error')
                }
            })
    }

    disableTap(tapId: number): Promise<Response> {
        return fetch(`${this.API_URL}/admin/tap/${tapId}/disable`, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('AdminService | disableTap | Error')
                }
            })
    }

    removeTap(tapId: number): Promise<void | Response> {
        return fetch(`${this.API_URL}/admin/tap/${tapId}/remove`, {
            method: "DELETE",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return Promise.resolve()
                } else {
                    throw new Error('AdminService | removeTap | Error')
                }
            })
    }

    resetDatabase(tableType: TableType): Promise<Response> {
        return fetch(`${this.API_URL}/admin/database/${tableType}/reset`, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('AdminService | resetDatabase | Error')
                }
            })
    }
}

export default new AdminService()

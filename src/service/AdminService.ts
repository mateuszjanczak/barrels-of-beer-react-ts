import {TableType} from "../model/TableType";
import AuthService from "./AuthService";

class AdminService {

    API_URL = "http://localhost:8080/api"

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

    removeTap(tapId: number): Promise<Response> {
        return fetch(`${this.API_URL}/admin/tap/${tapId}/remove`, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getHeaders()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
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
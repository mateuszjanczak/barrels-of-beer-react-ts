class AdminService {

    API_URL = "http://localhost:8080/api"

    enableTap(tapId: number): Promise<Response> {
        return fetch(`${this.API_URL}/admin/tap/${tapId}/enable`, {
            method: "POST"
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
            method: "POST"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('AdminService | disableTap | Error')
                }
            })
    }
}

export default new AdminService()
import { API_URL } from "../../../config/config.brd"

export const getAllSessions = async (AuthToken: string, setLoading: (value: boolean) => void, setSessions: (value: any) => void) => {
    try {
        const res = await fetch(`${API_URL}session/getlogins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthToken}`
            }
        })

        const data = await res.json()
        setSessions(data)
    } catch (error: any) {
        setLoading(false)
        console.log(error.message)
    }
}
import { API_URL } from "../../../config/config.brd"

export const thrVerifyUser = async (AuthToken: string, setLoading: (value: any) => void, setIsAuth: (value: any) => void) => {
    setLoading(true)
    try {
        const res = await fetch(`${API_URL}auth/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthToken}`
            }
        })

        if (!res.ok) {
            throw new Error(`Ha ocurrido un error: ${res.status}`)
        }
        console.log(res.status)
        
        setIsAuth(true)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}
import { API_URL } from "../../../config/config.brd"
import { crearCookie } from "../../auth/services/setCookie"

export const thrVerifyUserRefresh = async (RefreshToken: string, setLoading: (value: any) => void, setIsAuth: (value: any) => void) => {
    setLoading(true)
    try {
        const res = await fetch(`${API_URL}auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RefreshToken}`
            }
        })

        if (!res.ok) {
            setLoading(false)
            throw new Error(`Ha ocurrido un error: ${res.status}`)
        }
        console.log(`VERIFICACIÓN TOKEN REFRESH: ${res.status}`)

        const data = await res.json()
        const { token, duracionToken } = data
        const expiresTN = duracionToken * 1000
        crearCookie('AuthToken', token, expiresTN)
        setIsAuth(true)
        setLoading(false)
    } catch (error: any) {
        setIsAuth(false)
        setLoading(false)
        return { error: error.message }
    }
}
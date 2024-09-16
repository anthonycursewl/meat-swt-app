import { API_URL } from "../../config/config.brd"
import { crearCookie } from "../auth/services/setCookie"

export const refreshUser = async (RefreshToken: string) => {
    
    try {
        const res = await fetch(`${API_URL}auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RefreshToken}`
            }
        })

        if (!res.ok) {
            throw new Error(`Ha ocurrido un error: ${res.status}`)
        }
        console.log(`VERIFICACIÓN TOKEN REFRESH: ${res.status}`)

        const data = await res.json()
        const { token, duracionToken } = data
        const expiresTN = duracionToken * 1000
        crearCookie('AuthToken', token, expiresTN)
    } catch (error: any) {
        return { error: error.message }
    }
}
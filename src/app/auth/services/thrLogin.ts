import { API_URL } from "../../../config/config.brd"
import { crearCookie } from "./setCookie"

export const thrLogin = async (username: string, password: string, setLoading: (loading: boolean) => void) => {
    setLoading(true)
    try {

        if (!username || !password) {
            throw new Error('Todos los campos son obligatorios')
        }

        if (username.length > 255 || password.length > 200) {
           throw new Error('Ingrese datos válidos para iniciar sesión')
        }

        const res = await fetch(`${API_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.trim(), 
                password: password.trim()
            })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(`Ha ocurrido un error: ${error.error}`)
        }

        const data = await res.json()
        console.log(data)
        const { token, refresh_token, duracionToken, duracionRefreshToken } = data;
        const expiresRT = duracionRefreshToken * 1000
        const expiresTN = duracionToken * 1000
        crearCookie('AuthToken', token, expiresTN)
        crearCookie('RefreshToken', refresh_token, expiresRT)
        setLoading(false)
        return { data: data.token }
    } catch (error: any) {
        console.log(error.message)
        setLoading(false)
        return { error: error.message}
    }
}
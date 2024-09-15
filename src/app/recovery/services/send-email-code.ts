import { API_URL } from "../../../config/config.brd"

export const sendEmailCode = async (email: string, setLoading: any) => {
    try {

        if (!email) {
            throw new Error('Email is required')
        }

        if (!email.includes('@')) {
            throw new Error('Email is not valid')
        }

        if (email.length < 5) {
            throw new Error('Email is too short')
        }

        if (email.length > 255) {
            throw new Error('255 characters max')
        }

        let idCliente = crypto.randomUUID()

        setLoading(true)
        const res = await fetch(`${API_URL}password_reset/sendemailcode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email.trim(), clientKey: idCliente })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(`Error sending email code ${error.error}`)
        }

        const data = await res.json()
        console.log(data)
        setLoading(false)
        return { data: data, clientKey: idCliente }
    } catch (error: any) {
        setLoading(false)
        console.log(error.message)
        return { error: error.message }
    }
}
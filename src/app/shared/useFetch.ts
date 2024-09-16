export const useFetch = async (url: string, method: string, body: any) => {
    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body !== null ? JSON.stringify(body) : null
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(`Ha ocurrido un error. ${error.error}`)
        }

        return res
    } catch (error: any) {
        return error.message
    }
}
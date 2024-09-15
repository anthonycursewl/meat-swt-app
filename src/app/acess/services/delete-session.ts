import { API_URL } from "../../../config/config.brd"

export const deleteSession = async (id: string, setLoading: (value: boolean) => void, setSignNalDelete: (value: number) => void, AuthToken: string, signalDelete: number) => {
    setLoading(true)
    try {
        const res = await fetch(`${API_URL}session/removelogin/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AuthToken}`
            }
        })

        if (!res.ok) {
            throw new Error(`Ha ocurrido un error: ${JSON.stringify(res)}`)
        }

        console.log(res)
        setSignNalDelete(signalDelete + 1)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        return { error: error.message }
    }
}
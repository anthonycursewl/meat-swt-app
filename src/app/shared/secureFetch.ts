import { getCookie } from "../auth/services/getCookie";
import { refreshUser } from "./refreshUser";

export const secureFetch: any = async (url: string, method: string, body: any) => {
    let AuthToken = getCookie("AuthToken");
    const AuthRefreshToken = getCookie("RefreshToken");

    if (AuthToken === null && AuthRefreshToken !== null) {
        await refreshUser(AuthRefreshToken);
    }
    
    try {
        const data = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AuthToken}`,
            },
            body: body !== null ? JSON.stringify(body) : null,
        });

        if (data.status === 403) {
            await refreshUser(AuthRefreshToken !== null ? AuthRefreshToken : "");
            const state = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AuthToken}`,
                },
                body: body !== null ? JSON.stringify(body) : null,
            })
    
            return { state: state };
        }

        return { state: data }
    } catch (error: any) {
        return { error: error.message };
    }

}

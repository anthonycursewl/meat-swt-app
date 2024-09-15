import { useEffect } from "react"
import { getCookie } from "../auth/services/getCookie"
import { thrVerifyUser } from "./services/thrVerifyUser"
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { thrVerifyUserRefresh } from "./services/thrVerifuUserRefresh";

export default function ProtectedRoutes({ children }: any) {
    const [loading, setLoading] = useState<boolean | null>(null);
    const [isAuth, setIsAuth] = useState<boolean | null>(null);


    const verifyUser = async () => {
        const AuthToken = getCookie('AuthToken')
        if (AuthToken === null) {
            window.location.reload()
        }

        if (AuthToken !== null) {
            const state = await thrVerifyUser(AuthToken, setLoading, setIsAuth);
            
            if (loading === false) {
                setIsAuth(true)
            }

            if (state?.error) {
                console.log(state?.error)
                const AuthRefreshToken = getCookie('RefreshToken');
                
                if (AuthRefreshToken) { 
                    const rt = await thrVerifyUserRefresh(AuthRefreshToken, setLoading, setIsAuth);
                    
                    if (rt?.error) {
                        console.log(rt?.error)
                        setIsAuth(false)
                    }
                }
            }
        }

        else {
            const AuthRefreshToken = getCookie('RefreshToken');
            if (AuthRefreshToken !== null) {
                const rt = await thrVerifyUserRefresh(AuthRefreshToken, setLoading, setIsAuth);
                
                if (rt?.error) {
                    console.log(rt?.error)
                    setIsAuth(false)
                    setLoading(false)
                }
            } else {
                setIsAuth(false)
                setLoading(false)
            }
        }
    }



    useEffect(() => {
        verifyUser()
    }, [children])

    if (loading === null) {
        return (
            <div>
                Cargando...
            </div>
        )
    } else if (isAuth === null) {
        return (
            <div>
                Verificando...
            </div>
        )
    } else {
        if (!isAuth) {
            return <Navigate to="/login" />
        } else {
            return children
        }
    }
}
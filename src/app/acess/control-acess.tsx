import { getCookie } from "../auth/services/getCookie"
import NavbarDash from "../dashboard/navbar/navbar-dash"
import './control-acess.css'
import { useEffect, useState } from "react"
import { getAllSessions } from "./services/get-all-sessions"
import CardSessions from "./components/card-sessions"

export default function ControlAcess() {
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [signalDelete, setSignalDelete] = useState(1);

    const getSessions = async () => {
        const token = getCookie('AuthToken')
        if (!token) return 

        await getAllSessions(token, setLoading, setSessions);
        console.log("arrozito y se obtuvieron de nuevo las sesiones")
        console.log(sessions)
    }

    useEffect(() => {
        getSessions()
    }, [signalDelete])

    return (
        <section>
            <NavbarDash />

            <div className="control-access-cn">
                <div className="control-access">
                    <div className="control-access-title">
                        <img src="/icons/icon-access.svg" alt="" />
                        <p>Dashboard &gt; Control de Accesos</p>
                    </div>

                    <div className="control-access-sessions">
                        {
                            loading ? <p>Cargando...</p> :
                            (sessions?.map((session: any) => (
                                <CardSessions key={session.id} signalDelete={signalDelete} setSingalDelete={setSignalDelete} {...session}/>
                            ))
                        )
                        }
                    </div>
                
                </div>
            </div>

        </section>
    )
}
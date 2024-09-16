import NavbarDash from "../dashboard/navbar/navbar-dash"
import './control-acess.css'
import { useEffect, useState } from "react"
import CardSessions from "./components/card-sessions"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import ShowCurrentPath from "../components/ShowCurrentPath"

export default function ControlAcess() {
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [signalDelete, setSignalDelete] = useState(1);

    const getSessions = async () => {
        setLoading(true)
        const session = await secureFetch(`${API_URL}session/getlogins`, 'GET', null)

        if (session) { 
            const data = await session.state.json();
            setSessions(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSessions()
    }, [signalDelete])

    return (
        <section>
            <NavbarDash />

            <div className="control-access-cn">
                <div className="control-access">

                    <ShowCurrentPath path="Dashboard &gt; Control Access"/>

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
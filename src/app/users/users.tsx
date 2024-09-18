import NavbarDash from "../dashboard/navbar/navbar-dash"
import { useEffect, useState } from "react"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import { useGlobalState } from "../store/useGlobalState"
import { Link } from "react-router-dom"

// Componente para mostrar la ruta actual
import ShowCurrentPath from "../components/ShowCurrentPath"
import CardUser from "./components/card-user"

// Estado de carga
import ShowLoading from "../components/ShowLoading"

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setErrorMessage] = useState('')

    // Estado del modal 
    const [active, setActive] = useState(false)

    const handleOpenMdodal = () => {
        setActive(!active)
    }

    const { signalReload }: any = useGlobalState()

    const getAllUsers = async () => {
        setLoading(true)
        const response = await secureFetch(`${API_URL}accounts/getallaccounts`, 'GET', null)

        if (response?.state.ok) {
            const data = await response.state.json()
            setUsers(data)
            console.log(data)
            setLoading(false)
        } else {
            const error = await response?.state.status
            console.log(`ERROR ROLES ${error}`)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [signalReload])

    return (
        <>
        <NavbarDash />

        <section className="al-roles">

            <div className="al-roles-content">
                
                <ShowCurrentPath path="Dashboard &gt; Usuarios"/>

                <div className="al-roles-table">
                    <div className="roles-table-30">

                        <Link to="/dashboard/users/create">
                            <div className="al-roles-ktitle">
                                <img src="/icons/icon-create-role.svg" alt="" />
                                <p>Crear Usuario</p>
                            </div>
                        </Link>
                    </div>

                    <div className="roles-table-70">
                        {loading ? null :
                            users.map((u: any) => {
                                return (
                                    <CardUser id={u.id} username={u.username} permissions={u.permissions} key={u.id} configuracion={u.configuracion} userIsProtected={u.protected}/>
                                )
                            })
                        }
                    </div>
                </div>

                {loading ? <ShowLoading /> : null}

            </div>
            
        </section>
        </>
    )
}
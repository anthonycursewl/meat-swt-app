import "./roles.css"
import NavbarDash from "../dashboard/navbar/navbar-dash"
import { useEffect, useState } from "react"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import { IRoles } from "./interfaces/intRoles"
import { useGlobalState } from "../store/useGlobalState"
import { Link } from "react-router-dom"
import CardRole from "./components/card-role"

// Componente para mostrar la ruta actual
import ShowCurrentPath from "../components/ShowCurrentPath"

export default function Roles() {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)

    // Estado del modal 
    const [active, setActive] = useState(false)

    const handleOpenMdodal = () => {
        setActive(!active)
    }

    const { signalReload, setSignalReload }: any = useGlobalState()

    const getAllRoles = async () => {
        setLoading(true)
        const response = await secureFetch(`${API_URL}roles/getallroles`, 'GET', null)

        if (response?.state) {
            const data = await response.state.json()
            setRoles(data)
            setLoading(false)
        } else {
            setLoading(false)
            setSignalReload(signalReload + 1)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [signalReload])
    

    return (
        <>
        <NavbarDash />

        <section className="al-roles">

            <div className="al-roles-content">
                
                <ShowCurrentPath path="Dashboard &gt; Roles"/>

                <div className="al-roles-table">
                    <div className="roles-table-30">

                        <Link to="/dashboard/roles/create">
                            <div className="al-roles-ktitle">
                                <img src="/icons/icon-create-role.svg" alt="" />
                                <p>Crear Rol</p>
                            </div>
                        </Link>

                        <Link to={"/dashboard/roles/edit/"}>
                            <div className="al-roles-ktitle">
                                <img src="/icons/click-profile.svg" alt="" />
                                <p>Editar Rol</p>
                            </div>
                        </Link>
                    </div>

                    <div className="roles-table-70">
                        {loading ? <p>Cargando...</p> :
                            roles.map((role: IRoles) => {
                                return (
                                    <CardRole setActive={setActive} active={active} handleOpenModal={handleOpenMdodal} id={role.id} nombre={role.nombre} permisos={role.permisos} key={role.id}/>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            
        </section>
        </>
    )
}
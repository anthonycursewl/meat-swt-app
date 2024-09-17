import { ContainerMain } from "./components/container-main";
import ShowCurrentPath from "../components/ShowCurrentPath";
import NavbarDash from "../dashboard/navbar/navbar-dash";
import { useNavigate, useParams } from "react-router-dom";
import { secureFetch } from "../shared/secureFetch";
import { API_URL } from "../../config/config.brd";
import { useState, useEffect } from "react";
import './set-role.css'
import { ModalWarn } from "../auth/modal/modal-warn";

export default function SetRole() {
    // Recuperar el id del param
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingRoles, setLoadingRoles] = useState(false)
    const [roles, setRoles] = useState([])

    // Estados del modal para mostrar alertas
    const [active, setActive] = useState(false);
    const [error, setError] = useState('');

    // Estados para los roles 
    const [selectedRole, setSelectedRole] = useState<any>('')
    const [currentRoles, setCurrentRoles] = useState<any>([])

    // Estados para el modal de eliminación
    const [activeDelete, setActiveDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState('');
    const [loadingDelete, setLoadingDelete] = useState(false);

    const selectRoleByCard = (id: string) => {
        if (selectedRole === id) {
            setSelectedRole('')
            return
        }

        setSelectedRole(id)
    }

    const navigate = useNavigate()

    const { id } = useParams()

    const getAllUsers = async () => {
        setLoading(true)
        const response = await secureFetch(`${API_URL}accounts/getallaccounts`, 'GET', null)

        if (response?.state.ok) {
            const data = await response.state.json()
            const userFiltered = data?.filter((user: any) => user.id === id)
            setUsers(userFiltered)

            userFiltered?.map((perm: any) => {
                perm.permissions?.map((p: any) => {
                    console.log(p)
                    setCurrentRoles([...currentRoles, p.id, p.nombre])
                })
            })
            
            setLoading(false)
        } else {
            const error = await response?.state.status
            console.log(`ERROR ROLES ${error}`)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [id])


    const getAllRoles = async () => {
        setLoadingRoles(true)
        const response = await secureFetch(`${API_URL}roles/getallroles`, 'GET', null)

        if (response?.state.ok) {
            const data = await response.state.json()
            console.log(`DATA AQUI ROLES ${data}`)
            setRoles(data)
            setLoadingRoles(false) 
        } else {
            const error = await response?.state.status
            console.log(`ERROR ROLES ${error}`)
            setLoadingRoles(false)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [])

    const asignarRole = async () => {
        if (selectedRole === '') {
            setActive(true)
            setError('Error | Tienes que elegir un rol!')
            return
        }

        if (currentRoles.includes(selectedRole)) {
            setActive(true)
            setError('Error | El rol ya se encuentra asignado')
            return
        }

        const stateSetRole = await secureFetch(`${API_URL}roles/setroletouser`, 'POST', {
            userId: id,
            permissionId: selectedRole
        })

        if (stateSetRole?.state.ok) {
            console.log('Rol asignado')
            setActive(true)   
            setError('¡El Rol ha sido asignado con éxito!')
            navigate('/dashboard/users')
        } else {
            setActive(true)
            setError('Error | No se pudo asignar el rol')
        }
    }

    const openModalDelete = () => {
        setErrorDelete('¿Estás remover este rol a este usuario?')
        setActiveDelete(true)
    }

    const deleteRoleToUser = async () => {
        if (selectedRole === '') {
            setActive(true)
            setError('Error | Tienes que elegir un rol para remover!')
            return
        }

        if (!currentRoles.includes(selectedRole)) {
            setActive(true)
            setError('Error | El rol no se encuentra asignado')
            return
        }

        setLoadingDelete(true)
        const stateDeleteRole = await secureFetch(`${API_URL}roles/deleteroletouser`, 'DELETE', {
            userId: id,
            permissionId: selectedRole
        })

        if (stateDeleteRole?.state.ok) {
            console.log('Rol removido')
            setActive(true)   
            setError('¡El Rol ha sido removido con éxito!')
            navigate('/dashboard/users')
        } else {
            setActive(true)
            setError('Error | No se pudo remover el rol. Intenta de nuevo!')
        }
    }

    return (
        <>
        <NavbarDash />
        
        {loading ? <div>Cargando...</div> :
            <ContainerMain>
            
            <ShowCurrentPath path="Dashboard &gt; Usuarios &gt; Asignar rol"/>

                {users?.map((user: any) => (
                    <div key={user.id} className="user-title">
                        <img src="/icons/icon-info.svg" alt="Icon Información de Roles" />
                        <p>Gestionando Roles &gt; <span className="user-colors-global">{user.username}</span></p>
                    </div>
                ))}
                
                <div>
                    <h1>@ Roles Actuales</h1>
                </div>

                <div className="al-roles-d">
                    {
                    loadingRoles ? <div>Cargando...</div> :
                    currentRoles?.map((role: any) => (
                        <div key={role.id} className={`al-roles-card-d ${selectedRole === role.id ? 'selected' : ''}`} onClick={() => selectRoleByCard(role.id)}>
                            <img src="/icons/icon-roles.svg" alt="Icono de los Roles" />
                            <p>{role.nombre}</p>
                        </div>
                    ))
                    }
                </div>

                <div>
                    <h1>@ Roles disponibles</h1>
                </div>
                
                <div className="al-roles-d">
                    {
                    loadingRoles ? <div>Cargando...</div> :
                    roles?.map((role: any) => (
                        <div key={role.id} className={`al-roles-card-d ${selectedRole === role.id ? 'selected' : ''}`} onClick={() => selectRoleByCard(role.id)}>
                            <img src="/icons/icon-roles.svg" alt="Icono de los Roles" />
                            <p>{role.nombre}</p>
                        </div>
                    ))
                    }
                </div>

                <div className="btn-set-role">
                    <button onClick={asignarRole}>Asignar rol</button>
                    <button onClick={openModalDelete}>Eliminar rol</button>
                </div>
        </ContainerMain>
        }

        <ModalWarn error={errorDelete} active={activeDelete} setActive={setActiveDelete} dynamicFunction={deleteRoleToUser} loading={loadingDelete} />

        <ModalWarn active={active} setActive={setActive} error={error}/>
        </>
    )
}
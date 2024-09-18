import './user-options.css'
import { useNavigate } from 'react-router-dom';
import { ModalWarn } from '../../auth/modal/modal-warn';
import { useState } from 'react';
import { secureFetch } from '../../shared/secureFetch';
import { API_URL } from '../../../config/config.brd';
import { useGlobalState } from '../../store/useGlobalState';
import ModalProtectUser from './modal-protect-user';

interface Props {
    active: boolean;
    id?: string;
    permisos: any;
    setActive: (active: boolean) => void;
    nombre: string;
    userIsProtected: boolean
}

export const ModalOptinsUsers = ({ active, id, permisos, setActive, nombre, userIsProtected }: Props) =>  {

    const { signalReload, setSignalReload, setSignalModalFront, signalModalFront }: any = useGlobalState()

    const [activeDelete, setActiveDelete] = useState(false)
    const [laoding, setLoading] = useState(false)

    const handleClose = () => {
        if (setActive) {
            setActive(false)
        }
    }

    // Estados para abrir el modal para protección de usuario
    const [activeProtect, setActiveProtect] = useState(false)

    // Objeto para navegar entre rutas
    const navigate = useNavigate()

    const processDelete = () => {
        setActiveDelete(true)
    }

    const handleDeleteRole = async () => {
        setLoading(true)
        const state = await secureFetch(`${API_URL}accounts/deleteaccount/${id}`, 'DELETE', null)

        if (state?.state.ok) {
            setActiveDelete(false)
            handleClose()
            setLoading(false)
            setSignalReload(signalReload + 1)
        } else {
            const error = await state?.state.status
            console.log(`ERROR ROLES ${error}`)
            setLoading(false)
            handleClose()
        }
    }

    const handleOpenModalProtectUser = () => {
        setActiveProtect(true)
        setActive(false)
        setSignalModalFront(false)
    }

    const handleUnprotectUser = async () => {
        const stateRemove = await secureFetch(`${API_URL}accounts/removeuserprotection/${id}`, 'PUT', null)
        if (stateRemove?.state.ok) {
            setSignalReload(signalReload + 1)
        } else {
            setActive(false)
        }
    }

    return (
        <>
            <div className={`options_modal ${active ? (
                signalModalFront ? 'options_modal_active' :
                '' 
                )   
                : ''}`}>
            
            <div className='options_modal_content'>
                <div className='options_close_x'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                        <img src="/icons/icon-username.svg" alt="Logo Close" />
                        <p>{nombre}</p>
                    </div>
                </div>
                
                <ul className='options-list-links'>
                    <div className='options-perms'>
                        {
                            permisos?.map((permission: any) => {
                                return <p key={permission.id}>{permission.permisos}</p>
                            })
                        }
                    </div>

                    {
                        userIsProtected ?
                        <li onClick={() => handleUnprotectUser()}>
                            <img src="/icons/icon-unlock-user.svg" alt="Icon Editar Role" />
                            <p>Desproteger Usuario</p>
                        </li>
                        : 
                        <li onClick={() => handleOpenModalProtectUser()}>
                            <img src="/icons/icon-protect-user.svg" alt="Icon Editar Role" />
                            <p>Proteger Usuario</p>
                        </li>
                    }

                    <li onClick={() => navigate(`/dashboard/users/set-role/${id}`)}>
                        <img src="/icons/icon-roles-g.svg" alt="Icon Editar Role" />
                        <p>Roles</p>
                    </li>
                    <li onClick={() => navigate(`/dashboard/users/change-password/${id}`)}>
                        <img src="/icons/icon-edit-role.svg" alt="Icon Editar Role" />
                        <p>Cambiar contraseña</p>
                    </li>
                    <li onClick={() => processDelete()}>
                        <img src="/icons/icon-delete-role.svg" alt="Icon Eliminar Role" />
                        <p>Eliminar</p>
                    </li>
                </ul>
            </div>
        </div>
         
        <ModalProtectUser activeProtect={activeProtect} setActiveProtect={setActiveProtect} id={id as string} />
        <ModalWarn active={activeDelete} setActive={setActiveDelete} error={`¿Estás seguro que quieres borrar este Usuario?`} dynamicFunction={handleDeleteRole} loading={laoding} zIndex={2}/>
    </>
    )
}
import './user-options.css'
import { useNavigate } from 'react-router-dom';
import { ModalWarn } from '../../auth/modal/modal-warn';
import { useState } from 'react';
import { secureFetch } from '../../shared/secureFetch';
import { API_URL } from '../../../config/config.brd';
import { useGlobalState } from '../../store/useGlobalState';

interface Props {
    active: boolean;
    id?: string;
    permisos: any;
    setActive: (active: boolean) => void;
    nombre: string;
}

export const ModalOptinsUsers = ({ active, id, permisos, setActive, nombre }: Props) =>  {

    const { signalReload, setSignalReload }: any = useGlobalState()

    const [activeDelete, setActiveDelete] = useState(false)
    const [laoding, setLoading] = useState(false)

    const handleClose = () => {
        if (setActive) {
            setActive(false)
        }
    }

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

    return (
        <>
            <div className={`options_modal ${active ? 'options_modal_active' : ''}`}>
            
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
                                return (
                                    <>
                                        <p key={permission}>{permission.permisos}</p>
                                    </>
                                )
                            })
                        }
                    </div>

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
        
        <ModalWarn active={activeDelete} setActive={setActiveDelete} error={`¿Estás seguro que quieres borrar este Usuario?`} dynamicFunction={handleDeleteRole} loading={laoding} zIndex={2}/>
    </>
    )
}
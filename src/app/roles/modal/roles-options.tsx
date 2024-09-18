import './roles-options.css'
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

export const ModalOptinsRoles = ({ active, id, permisos, setActive, nombre }: Props) =>  {

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
        const state = await secureFetch(`${API_URL}roles/deleterole/${id}`, 'DELETE', null)

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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                        <img src="/icons/icon-show-role.svg" alt="Logo Close" />
                        <p>{nombre}</p>
                    </div>
                    
                    <p id='letters-id'>{id?.split('-')[0]}</p>
                </div>
                
                <ul className='options-list-links'>
                    <div className='options-perms'>
                        {
                            permisos?.map((permission: any) => {
                                return <p key={permission}>{permission}</p>
                            })
                        }
                    </div>

                    <li onClick={() => navigate(`/dashboard/roles/edit/${id}`)}>
                        <img src="/icons/icon-edit-role.svg" alt="Icon Editar Role" />
                        <p>Editar</p>
                    </li>
                    <li onClick={() => processDelete()}>
                        <img src="/icons/icon-delete-role.svg" alt="Icon Eliminar Role" />
                        <p>Eliminar</p>
                    </li>
                </ul>
            </div>
        </div>
        
        <ModalWarn active={activeDelete} setActive={setActiveDelete} error={`¿Estás seguro que quieres borrar este rol? ID ${id}`} dynamicFunction={handleDeleteRole} loading={laoding} zIndex={2}/>
    </>
    )
}
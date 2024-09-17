import { useState } from 'react';
import './modal-protect-user.css'
import { useGlobalState } from '../../store/useGlobalState';
import { secureFetch } from '../../shared/secureFetch';
import { API_URL } from '../../../config/config.brd';


interface Props {
    id: string
    activeProtect: boolean
    setActiveProtect: (active: boolean) => void
}

export default function ModalProtectUser({ id, activeProtect, setActiveProtect }: Props) {
    const [message, setMessage] = useState('¿Estás seguro que deseas proteger este usuario?')
    const [loading, setLoading] = useState(false)

    const { setSignalModalFront, signalReload, setSignalReload }: any = useGlobalState()

    const handleClose = () => {
        if (setActiveProtect) {
            setActiveProtect(false)
            setSignalModalFront(true)
        }
    }


    const processDelete = async () => {
        if (id) {
            setLoading(true)
            const stateProtectUser = await secureFetch(`${API_URL}accounts/setprotecteduser/${id}`, 'PUT', null)

            if (stateProtectUser?.state.ok) {
                setMessage('¡Éxito | Usuario protegido con exito!')
                
                setTimeout(() => {
                    setLoading(false)
                    handleClose()
                    setSignalReload(signalReload + 1)
                }, 500);
            } else {
                setMessage('Error | Ocurrio un error al proteger el usuario!')
                setLoading(false)
            }
        }

        if (!id) {
            setMessage('Error | Debe seleccionar un usuario!')
            return
        }
    }

    return (
        <div className={`modal_protect ${activeProtect ? 'modal_protect_active' : ''}`}>
            <div className='modal_protect_content'>
                <div>
                    <p>{message}</p>
                </div>

                <div className='modal_group_p_buttons'>
                    {
                        loading === false ? 
                        <>
                            <button onClick={() => handleClose()}>
                            <img src="/icons/icon-delete-role.svg" alt="Cancel Button" />
                            Cancelar
                            </button>
                            <button onClick={() => processDelete()}>
                                <img src="/icons/icon-protect-user.svg" alt="Protection button" />
                                Proteger
                            </button>
                        </> :
                        <>
                            <div className='modal_load_protect'>
                                <img src="/icons/icon-protect-user.svg" alt="Protection button" />
                                Procesando...
                            </div>
                            <div className='loader'></div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
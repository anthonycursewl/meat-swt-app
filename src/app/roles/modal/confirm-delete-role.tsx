import { secureFetch } from '../../shared/secureFetch';
import './confirm-delete-role.css'
import { useState } from 'react';
import { API_URL } from '../../../config/config.brd';

interface ConfirmDeleteModalProps {
    id: string;
    signalDelete: number;
    setSingalDelete: (value: number) => void;
}

export const ConfirmDeleteRole = ({ id, signalDelete, setSingalDelete }: ConfirmDeleteModalProps) => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setIsActive(!isActive)
    }

    const handleDeleteSession = async () => {
        setLoading(true)
        const fDelete = await secureFetch(`${API_URL}session/removelogin/${id}`, 'DELETE', null)

        if (fDelete) {
            setSingalDelete(signalDelete + 1)
            handleOpenModal()
            setLoading(false)
            console.log(fDelete)
        }
    }


    return (
        <>
            <div className="c-delete-s" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                <img src="/session/session-delete.svg" alt="Imagen para eliminar la sesion" />
                <p>Eliminar</p>
            </div>

            <div className={`session_modal ${isActive ? 'session_modal_active' : ''}`}>
                <div className="session_modal_content">
                    <div className='session_modal_close'>
                        <img src="/svgs/close-modal.svg" alt="Delete Close" onClick={handleOpenModal}/>

                        <img src="/mark/duran-logo-r.webp" alt="Duran Logo" />
                    </div>

                    <div className='session_modal_text'>
                        <p>¿Estás seguro que quieres eliminar esta sesión?</p>
                        <p id='letters-id'>{id?.split("-")[0]}</p>
                    </div>


                    <button className={`${loading ? 'session_modal_button_loading' : 'session_modal_button'}`} onClick={() => handleDeleteSession()}>
                        <img src="/session/session-delete.svg" alt="" />
                        {loading ? <div className='loader'></div> : 'Eliminar'}
                    </button>
                </div>
            </div>
        </>
    )
}
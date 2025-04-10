import { useNavigate } from 'react-router-dom';
import './options-product.css'
import { useState } from 'react';
import ModalWarn from '../../auth/modal/modal-warn';
import { secureFetch } from '../../shared/secureFetch';
import { API_URL } from '../../../config/config.brd';
import { useGlobalState } from '../../store/useGlobalState';

interface Props {
    active: boolean;
    setActive: () => void;
    info?: any
}


export const ModalOptiosnProducts = ({ active, setActive, info }: Props) =>  {
    const navigate = useNavigate()

    const { signalReload, setSignalReload }: any = useGlobalState() 

    const [error, setError] = useState<string>('¿Estás segur@ que quieres eliminar este producto?')
    const [loading, setLoading] = useState<boolean>(false)
    const [activeWarn, setActiveWarn] = useState<boolean>(false)

    const handleDelteProduct = async () => {
        setLoading(true)
        const stateDelete = await secureFetch(`${API_URL}productos/delete/${info?.id}`, 'DELETE', null)
        if (!stateDelete?.state.ok) {
            setError(`Ha ocurrido un error: ${stateDelete?.state.error}`)
            setActiveWarn(true)
            setLoading(false)
        } else {
            setError('Éxito | Producto borrado correctamente!')
            setActiveWarn(true)

            setTimeout(() => {
                setSignalReload(signalReload + 1)
                setActiveWarn(false)
            }, 1000)
        }
    }

    return (
        <>
            <div className={`modal_p_options ${active ? 'modal_p_options_active' : ''}`}>
                <div className={`${active ? 'modal_p_options_content_active' : 'modal_p_options_content'}`}>
                    
                    <div className='modal_p_options_close'>
                        <div className='modal_p_name'>
                            <img src="/icons/icon-c-product.svg" alt="" />
                            <p>{info?.nombre}</p>
                        </div>
                        <img src="/icons/icon-product-sl.svg" alt="" />
                    </div>

                    <ul className='options-list-links'>

                    <li onClick={() => navigate(`/dashboard/products/edit/${info?.id}`)}>
                        <img src="/icons/icon-edit-role.svg" alt="Icon Editar Role" />
                        <p>Editar</p>
                    </li>
                    <li onClick={() => {setActiveWarn(true)}}>
                        <img src="/icons/icon-delete-role.svg" alt="Icon Eliminar Role" />
                        <p>Eliminar</p>
                    </li>

                    <li onClick={() => {setActive()}}>
                        <img src="/svgs/close-modal.svg" alt="Icon Eliminar Role" />
                        <p>Cerrar</p>
                    </li>
                </ul>
                </div>
            </div>            

            <ModalWarn active={activeWarn} setActive={setActiveWarn} error={error} dynamicFunction={handleDelteProduct} loading={loading}/>
        </>
    )
}
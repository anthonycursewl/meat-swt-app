import { useNavigate } from 'react-router-dom';
import '../../products/components/options-product.css'
import { useEffect, useState } from 'react';
import ModalWarn from '../../auth/modal/modal-warn';
import { secureFetch } from '../../shared/secureFetch';
import { API_URL } from '../../../config/config.brd';
import { useGlobalState } from '../../store/useGlobalState';

interface Props {
    active: boolean;
    setActive: (v: boolean) => void;
    info?: any
}


export const ShowDetialsInvoice = ({ active, setActive, info }: Props) =>  {
    const navigate = useNavigate()

    const { signalReload, setSignalReload }: any = useGlobalState() 

    const [error, setError] = useState<string>('¿Estás segur@ que quieres eliminar esta factura?')
    const [loading, setLoading] = useState<boolean>(false)
    const [activeWarn, setActiveWarn] = useState<boolean>(false)

    const handleDelteProduct = async () => {
        setLoading(true)
        const stateDelete = await secureFetch(`${API_URL}transacciones/delete/${info?.id}`, 'DELETE', null)
        if (!stateDelete?.state.ok) {
            setError(`Ha ocurrido un error. ${stateDelete?.state.error}`)
            setActiveWarn(true)
            setLoading(false)
        } else {
            setError('Éxito | Factura borrado correctamente!')
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
                            <p>{info?.producto}</p>
                        </div>
                        <img src="/icons/icon-product-sl.svg" alt="" />
                    </div>

                    <ul className='options-list-links'>

                        <li style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
                            <p>Fecha</p>
                            <p>{info.fecha.slice(0,10)}</p>
                        </li>

                        <li style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
                            <p>Tipo de Factura</p>
                            <p>{info.tipo}</p>
                        </li>

                        <li style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
                            <p>Total</p>
                            <p>{info.total}</p>
                        </li>

                        <li>
                            <p>Detalles</p>
                        </li>
                        {
                            info?.detalles?.map((item: any, index: number) => (
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}} key={index}>
                                    <li style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%'}}>
                                        <p>$ Precio Individual</p>
                                        <p>{item?.precioIndividual}</p>
                                    </li>

                                    <li style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%'}}>
                                        <p>Cantidad</p>
                                        <p>{item?.cantidad}</p>
                                    </li>
                                </div>
                                
                            ))
                        }

                        <li onClick={() => {setActiveWarn(true)}}>
                            <img src="/icons/icon-delete-role.svg" alt="Icon Eliminar Role" />
                            <p>Eliminar</p>
                        </li>

                        <li onClick={() => {console.log("ola")}}>
                            <img src="/icons/icon-c-product.svg" alt="Icon Eliminar Role" />
                            <p>Generar PDF</p>
                        </li>

                        <li onClick={() => {setActive(false)}}>
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
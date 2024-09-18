import { useState, useRef } from "react"
import './invoice-to-product.css'
import { secureFetch } from "../../shared/secureFetch"
import { API_URL } from "../../../config/config.brd"
import { ModalWarn } from "../../auth/modal/modal-warn"
import { useGlobalState } from "../../store/useGlobalState"

export default function InvoiceToProduct() {
    // Estado para más detalles
    const [isMoreDetails, setIsMoreDetails] = useState<boolean>(false)

    const formRef = useRef<any>()
    const [active, setActive] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    // "Signal" para hacer el reload de los productos en la factura
    const { signalReload, setSignalReload }: any = useGlobalState()

    const handleSumbit = async (e: any) => {        
        e.preventDefault()

        const { nombre, desc, precio } = formRef.current.elements;
        if (nombre.value === '' || desc.value === '' || precio.value === '') {
            setActive(true)
            setError('Error | Todos los campos son obligatorios!')
            return
        }

        if (precio.value <= 0) {
            setActive(true)
            setError('Error | El precio debe ser mayor a 0!')
            return
        }

        if (isNaN(precio.value)) {
            setActive(true)
            setError('Error | El precio debe ser un número. Intenta de nuevo!')
            return
        }
        
        setLoading(true)
        const id = crypto.randomUUID()
        const state = await secureFetch(`${API_URL}productos/create/${id.split('-')[0]}`, 'PUT', {
            nombre: nombre.value.trim(),
            descripcion: desc.value.trim(),
            precio: precio.value
        })

        if (!state?.state.ok) {
            setActive(true)
            setError(`Ha ocurrido un error: ${state?.state.error}`)
            setLoading(false)
        } else {
            setError(`Éxito | Producto ${nombre.value} ha sido creado correctamente!`)
            setActive(true)

            setTimeout(() => {
                setSignalReload(signalReload + 1)
                setLoading(false)
                setActive(false)
            }, 1000);
            formRef.current.reset()
        }
    }

    return (
        <div className="invoice-form">
        <form onSubmit={handleSumbit} ref={formRef}>
            <div className={`div-p-all ${isMoreDetails ? 'div-p-all-2' : ''}`}>    
                <div>
                    <div className="invoice-form-inp">
                        <label>
                            Nombre
                        </label>
                        <input type="text" name="nombre" id="nombre" placeholder="Nombre del Producto..."/>
                    </div>
                </div>

                <div>
                    <div className="invoice-form-inp">
                        <label>Precio</label>
                        <input type="number" name="precio" id="precio" placeholder="Precio del Producto..."/>
                    </div>
                </div>

                <div>
                    <div className="invoice-form-inp">
                        <label>Descripción</label>
                        <textarea name="desc" id="desc" placeholder="Descripción del producto...."></textarea>
                    </div>
                </div>

                <div className="invoice-button">
                    {
                    loading ? <div className="loader"></div> :
                    <button>
                        <img src="/icons/icon-create-product.svg" alt="Icono de crear producto" />
                        Registrar
                    </button>
                    }
                </div>
            </div>

            <div className="inv-add-details" onClick={() => {setIsMoreDetails(!isMoreDetails)}}>
                <img src="/icons/icon-roles.svg" alt="Agregar detalles" />
                <label>Agregar Producto</label>
            </div>

        </form>

        <ModalWarn active={active} setActive={setActive} error={error} />
    </div>
    )
}
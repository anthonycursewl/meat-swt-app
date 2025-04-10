import './products.css'
import '../dashboard/dashboard.css'
import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "../roles/components/container-main"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import ModalWarn from "../auth/modal/modal-warn"


export default function CreateProduct() {
    const formRef = useRef<any>()
    const [active, setActive] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSumbit = async (e: any) => {        
        e.preventDefault()

        const { name, desc, precio } = formRef.current.elements;
        if (name.value === '' || desc.value === '' || precio.value === '') {
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
            nombre: name.value.trim(),
            descripcion: desc.value.trim(),
            precio: precio.value
        })

        if (!state?.state.ok) {
            setActive(true)
            setError(`Ha ocurrido un error: ${state?.state.error}`)
            setLoading(false)
        } else {
            setError(`Éxito | Producto ${name.value} ha sido creado correctamente!`)
            setActive(true)

            setTimeout(() => {
                setLoading(false)
                setActive(false)
            }, 1000);
            formRef.current.reset()
        }
    }

    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                <div className="container-product-create">
                    <div className='user-title'>
                        <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                        <p>Puedes editar los productos registrados en el sistema en <Link to="/dashboard/products">Productos.</Link></p>
                    </div>

                    <div className="dashboard-p-form">
                        <form className="form-products" ref={formRef} onSubmit={handleSumbit}>
                            <div>
                                <label>Nombre del Producto</label>
                                <input type="text" name="name" id="name"/>
                            </div>

                            <div>
                                <label>Descripción</label>
                                <textarea name="desc" id="desc"></textarea>
                            </div>

                            <div>
                                <label>Precio</label>
                                <input type="number" name="precio" id="precio"/>
                            </div>

                            {loading ? null : <button>
                                <img src="/icons/icon-create-product.svg" alt="Icono del boton para crear el producto" />
                                Registrar
                            </button>}
                            
                        </form>
                            {loading ? <div className="loader"></div> : null}

                    </div>
                </div>  
                
                <ModalWarn setActive={setActive} active={active} error={error}/>
            </ContainerMain>
        </>
    )
}
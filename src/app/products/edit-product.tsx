import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "../roles/components/container-main"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import { ModalWarn } from "../auth/modal/modal-warn"
import ShowLoading from "../components/ShowLoading"

export default function EditProduct() {
    const formRef = useRef<any>()
    const [active, setActive] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    // Estados para cambiar el producto 
    const [nombre, setNombre] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [price, setPrice] = useState<any>('')

    // Navegar entre rutas
    const navigate = useNavigate()

    const { id } = useParams()

    const handleSumbit = async (e: any) => {        
        e.preventDefault()

        if (nombre === '' || desc === '' || price === 0) {
            setActive(true)
            setError(`Error | Todos los campos son obligatorios`)
            return
        }

        if (price < 0) {
            setActive(true)
            setError(`Error | El precio debe ser mayor a 0`)
            return
        }

        if (price === '') {
            setActive(true)
            setError(`Error | El precio debe ser mayor a 0`)
            return
        }
        
        setLoading(true)
        const state = await secureFetch(`${API_URL}productos/edit/${id}`, 'PUT', {
            nombre: nombre.trim(),
            descripcion: desc.trim(),
            precio: price
        })

        if (!state?.state.ok) {
            setActive(true)
            setError(`Ha ocurrido un error. ${state?.state.status}`)
            setLoading(false)
        } else {
            setError(`Éxito | Producto ${nombre} ha sido actulizado correctamente!`)
            setActive(true)

            setTimeout(() => {
                setLoading(false)
                setActive(false)
            }, 1000);

            navigate('/dashboard/products')
        }
    }

    const getProductById = async () => {
        setLoading(true)
        const state = await secureFetch(`${API_URL}productos/getall`, 'GET', null)

        if (!state?.state.ok) {
            alert(state?.state.error)
            setLoading(false)
        } else {
            const data = await state?.state.json()
            setLoading(false)
            const product = data.find((item: any) => item.id === id)

            setNombre(product?.nombre)
            setDesc(product?.descripcion)
            setPrice(product?.precio)
        }
    }


    useEffect(() => {
        getProductById()
    }, [])

    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                <div className="dashboard-container">
                    <div className='user-title'>
                        <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                        <p>Te encuentras editando el producto {nombre}. <Link to="/dashboard/products">Ver más.</Link></p>
                    </div>

                    <div className="dashboard-p-form">
                        <form className="form-products" ref={formRef} onSubmit={handleSumbit}>
                            <div>
                                <label>Nombre del Producto</label>
                                <input type="text" name="name" id="name" value={nombre} onChange={e => setNombre(e.target.value)}/>
                            </div>

                            <div>
                                <label>Descripción</label>
                                <textarea name="desc" id="desc" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                            </div>

                            <div>
                                <label>Precio</label>
                                <input type="number" name="precio" id="precio" value={price} onChange={e => setPrice(e.target.value)}/>
                            </div>

                            {loading ? null : <button>
                                <img src="/icons/icon-create-product.svg" alt="Icono del boton para crear el producto" />
                                Actualizar
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
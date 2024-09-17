import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "../roles/components/container-main"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"

export default function CreateProduct() {
    const formRef = useRef<any>()

    const handleSumbit = async (e: any) => {        
        e.preventDefault()

        const { name, desc, precio } = formRef.current.elements;
        if (name.value === '' || desc.value === '' || precio.value === '') {
            alert('Todos los campos son obligatorios')
            return
        }

        if (precio.value <= 0) {
            alert('El precio debe ser mayor a 0')
            return
        }

        if (isNaN(precio.value)) {
            alert('El precio debe ser un numero')
            return
        }

        const id = crypto.randomUUID()
        const state = await secureFetch(`${API_URL}productos/create/${id.split('-')[0]}`, 'PUT', {
            nombre: name.value.trim(),
            descripcion: desc.value.trim(),
            precio: precio.value
        })

        if (!state?.state.ok) {
            alert(state?.state.error)
        } else {
            alert('Producto registrado')
            formRef.current.reset()
        }
    }

    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                <div className="dashboard-container">
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

                            <button>
                                Registrar
                            </button>
                        </form>

                    </div>
                </div>  
            </ContainerMain>
        </>
    )
}
import { ContainerMain } from "../roles/components/container-main"
import NavbarDash from "./navbar/navbar-dash"
import './dashboard.css'
import { useEffect, useRef } from "react"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"

export default function Dashboard() {
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

    const getAllProducts = async () => {

        const state = await secureFetch(`${API_URL}productos/getall`, 'GET', null)

        if (!state?.state.ok) {
            console.log(state?.state.error)
        } else {
            const data = await state.state.json()
            console.log(data)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                
                <div className="dashboard-container">
                    <div className="dashboard-head">
                        <h1>Dashboard</h1>
                        <p>Registar producto</p>
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

                            <div className="form-products-button">
                                <button>Registrar</button>
                            </div>

                        </form>

                    </div>
                </div>

            </ContainerMain>
        </>
    )
}
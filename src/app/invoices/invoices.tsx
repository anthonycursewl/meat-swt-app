import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "../roles/components/container-main"
import { Link } from "react-router-dom"
import './invoices.css'
import { date } from "../../config/config.brd"
import { useState } from "react"

export default function Invoices() {
    const types = ["Compras", "Ventas"]
    const [today, setToday] = useState(new Date())

    return (
        <>
            <NavbarDash />

            <ContainerMain>
                <div className='user-title'>
                    <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                    <p>Facturas | Puedes registrar facturas de tipo Compra o Venta <Link to={"/dashboard/invoices/create"}>aquí.</Link></p>
                </div>

                <div>
                    <h1>ola</h1>
                </div>
            </ContainerMain>
        </>
    )
}

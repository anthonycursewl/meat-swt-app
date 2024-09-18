import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "../roles/components/container-main"
import './invoices.css'
import { Link } from "react-router-dom"
import Invoice from "./components/invoice"
import InvoiceToProduct from "./components/invoice-to-product"

export default function CreateInvoice() {
    return (
        <>
            <NavbarDash />
            <ContainerMain>
                <div className='user-title'>
                    <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                    <p>Facturas | Puedes consultar la información de las nuevas facturas <Link to={"/dashboard/invoices"}>aquí.</Link></p>
                </div>
                
                <InvoiceToProduct />

                <Invoice />

                
            </ContainerMain>
        </>
    )
}
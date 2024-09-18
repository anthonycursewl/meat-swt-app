import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "../roles/components/container-main"
import { Link } from "react-router-dom"
import './invoices.css'
import { API_URL, date } from "../../config/config.brd"
import { useEffect, useState } from "react"
import { secureFetch } from "../shared/secureFetch"
import { ShowDetialsInvoice } from "./components/show-details-invoice"
import '../products/components/options-product.css'
import { useGlobalState } from "../store/useGlobalState"

export default function Invoices() {
    const types = ["Compras", "Ventas"]
    const [today, setToday] = useState(new Date())

    const [invoices, setInvoices] = useState([])

    const [active, setActive] = useState<boolean>(false)

    const { signalReload }: any = useGlobalState()

    const getAllInvoices = async () => {
        const state = await secureFetch(`${API_URL}transacciones/getall`, "GET", null)

        if (state?.state.ok) {
            const data = await state.state.json()
            setInvoices(data)
        } else {
            const error = await state?.state.status
            console.log(`Error | No se pudieron obtener las facturas! code: ${error}`)
        }
    }

    useEffect(() => {
        getAllInvoices()
    }, [signalReload])

    return (
        <>
            <NavbarDash />

            <ContainerMain>
                <div className='user-title'>
                    <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                    <p>Facturas | Puedes registrar facturas de tipo Compra o Venta <Link to={"/dashboard/invoices/create"}>aquí.</Link></p>
                </div>

                <div className="products-create">
                    <Link to={"/dashboard/invoices/create"}>
                        <img src="/icons/icon-c-product.svg" alt="Productos create" />
                        <h3>Nueva Factura</h3>
                    </Link>
                </div>

                <div className="invoices-to-show">
                    {
                        invoices?.map((item: any) => (
                            <div key={item.id} className="child-invoice" onClick={() => setActive(!active)}>
                                <div className="invoice-title-we">
                                    <p>Factura</p>
                                    <p>{item.id?.split("-")[0]}</p>
                                </div>

                                <div className="invoice-title-we">
                                    <p>Total</p>
                                    <p>$ {item.total}</p>
                                </div>

                                <ShowDetialsInvoice active={active} setActive={setActive} info={item}/>
                            </div>
                        ))
                    }
                </div>

            </ContainerMain>
        </>
    )
}

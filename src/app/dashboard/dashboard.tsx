import './dashboard.css'
import { ContainerMain } from "../roles/components/container-main"
import NavbarDash from "./navbar/navbar-dash"
import { Link } from "react-router-dom"

export default function Dashboard() {
    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                
                <div className="dashboard-container">

                    <div className='user-title'>
                        <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                        <p>Puedes editar los productos registrados en el sistema en <Link to="/dashboard/products">Productos.</Link></p>
                    </div>

                </div>

            </ContainerMain>
        </>
    )
}
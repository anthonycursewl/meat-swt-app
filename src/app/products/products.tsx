import { useEffect } from "react";
import { API_URL } from "../../config/config.brd";
import NavbarDash from "../dashboard/navbar/navbar-dash";
import { ContainerMain } from "../roles/components/container-main";
import { secureFetch } from "../shared/secureFetch";
import './products.css'
import { useState } from "react";
import CardProduct from "./components/card-product";

export default function Products() {
    const [products, setProducts] = useState<any>([])
    const getAllProducts = async () => {
        const state = await secureFetch(`${API_URL}productos/getall`, 'GET', null)

        if (!state?.state.ok) {
            alert(state?.state.error)
        } else {
            const data = await state?.state.json()
            console.log(data)
            setProducts(data)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                <div className="products-container">

                    <div className='user-title'>
                        <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                        <p>Productos | todos los productos que han sido registrados. Pulsa para <a style={{cursor: 'pointer', textDecoration: 'underline'}}>Editar.</a></p>
                    </div>

                    <div className="products-cards">
                        {products?.map((item: any) => (
                            <CardProduct key={item._id} nombre={item?.nombre} precio={item?.precio} descripcion={item?.descripcion}/>
                        ))}
                    </div>

                </div>
            </ContainerMain>
        </>
    );
}
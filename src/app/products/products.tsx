import { useEffect } from "react";
import { API_URL } from "../../config/config.brd";
import NavbarDash from "../dashboard/navbar/navbar-dash";
import { ContainerMain } from "../roles/components/container-main";
import { secureFetch } from "../shared/secureFetch";
import './products.css'
import { useState } from "react";
import CardProduct from "./components/card-product";
import { Link } from "react-router-dom";
import ShowLoading from "../components/ShowLoading";
import { useGlobalState } from "../store/useGlobalState";

export default function Products() {
    const [products, setProducts] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)

    // Recibir la signal para recargar
    const { signalReload }: any = useGlobalState()

    const getAllProducts = async () => {
        setLoading(true)
        const state = await secureFetch(`${API_URL}productos/getall`, 'GET', null)

        if (!state?.state.ok) {
            alert(state?.state.error)
            setLoading(false)
        } else {
            const data = await state?.state.json()
            setLoading(false)
            console.log(data)
            setProducts(data)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [signalReload])

    return (
        <>
            <NavbarDash />
            
            <ContainerMain>
                <div className="products-container">

                    <div className='user-title'>
                        <img src="/svgs/svg-c-product.svg" alt="Creación de productos" />
                        <p>Productos | todos los productos que han sido registrados. Pulsa para <a style={{cursor: 'pointer', textDecoration: 'underline'}}>Editar.</a></p>
                    </div>

                    <div className="products-create">
                        <Link to={'/dashboard/products/create'}>
                            <img src="/icons/icon-c-product.svg" alt="" />
                            Crear producto
                        </Link>
                    </div>

                    <div className="products-cards">
                        {loading ? null : products?.map((item: any) => (
                            <CardProduct key={item.id} nombre={item?.nombre} precio={item?.precio} descripcion={item?.descripcion} id={item.id} info={item}/>
                        ))}
                    </div>

                </div>

                {loading ? <ShowLoading /> : null}
            </ContainerMain>
        </>
    );
}
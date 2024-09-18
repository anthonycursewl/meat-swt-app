import { useState, useEffect, useRef } from "react"
import { secureFetch } from "../../shared/secureFetch"
import { API_URL } from "../../../config/config.brd"
import { useGlobalState } from "../../store/useGlobalState"

export default function Invoice() {
    const types = ["Compras", "Ventas"]
    const [today, setToday] = useState(new Date())

    const formRef = useRef<any>()

    // Estado para más detalles
    const [isMoreDetails, setIsMoreDetails] = useState<boolean>(false)

    const [products, setProducts] = useState<any>([])

    // "Signal" para hacer el reload de los productos en la factura
    const { signalReload }: any = useGlobalState()

    // Productos selecionados estados
    const [selectedProducts, setSelectedProducts] = useState<any>([])
    const [productAdded, setProductAdded] = useState<any>([])

    const getAllProducts = async () => {
        const state = await secureFetch(`${API_URL}productos/getall`, 'GET', null)

        if (state?.state.ok) {
            const data = await state.state.json()
            setProducts(data)
        } else {
            const error = await state?.state.status
            console.log(`Error | No se pudieron obtener los productos! code: ${error}`)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [signalReload])

    const handleAddProduct = (e: any) => {
        e.preventDefault()
        
        const { product, cantidad } = formRef.current.elements;

        if (product.value === '' || cantidad.value === '') {
            alert('Error | Para agregar un producto a la factura tienes que especificar la cantidad!')
            return
        }

        const precio = products.find((p: any) => p.id === product.value)?.precio
        const nombre = products.find((p: any) => p.id === product.value)?.nombre

        console.log(product.value)
        console.log(cantidad.value)
        console.log(precio)

        setProductAdded([...productAdded, { id: product.value, cantidad: cantidad.value, precio: precio, nombre: nombre }])
    }

    const handleSumbit = (e: any) => {
        e.preventDefault()

        console.log(selectedProducts)
    }

    return (
        <div className="invoice-form">
        <form ref={formRef} onSubmit={handleAddProduct}>
            <div className={`div-with-all-info ${isMoreDetails ? 'div-with-all-info-2' : ''}`}>    
                <div>
                    <div className="invoice-form-inp">
                        <label>
                            Tipo de Factura
                        </label>
                        <select name="type" id="type">
                            {
                                types.map((type, index) => {
                                    return (
                                        <option key={index} value={type}>{type}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div>
                    <div className="invoice-form-inp">
                        <label>Fecha</label>
                        <input type="date" min={today.toISOString().split('T')[0]}/>
                    </div>
                </div>

                <div>
                    <div className="invoice-form-inp">
                        <label>Descripción</label>
                        <textarea name="desc" id="desc" placeholder="Descripción de la factura...."></textarea>
                    </div>
                </div>

                <div className="invoice-form-inp">
                    <label>Producto</label>
                    <select name="product" id="product" onChange={(e) => {setSelectedProducts(e.target.value)}}>
                        {
                            products?.map((product: any) => {
                                return (
                                    <option key={product.id} value={product.id} data-price={product.precio}>{product.nombre} | ${product.precio}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="invoice-form-inp">
                    <label>Cantidad</label>
                    <input type="number" name="cantidad" id="cantidad"/>
                </div>

                <div className="invoice-button">
                    <button onClick={handleAddProduct}>
                        <img src="/icons/icon-create-product.svg" alt="Icon Create Product" />
                        Agregar
                    </button>
                </div>
            </div>

            <div>
                <p>Productos agregados</p>

                {
                    productAdded?.map((product: any) => (
                        <p key={product.id}>{product.nombre} | {product.cantidad}</p>
                    ))
                }
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '20px', marginBottom: '2rem'}}>
                <div className="inv-add-details" onClick={() => {setIsMoreDetails(!isMoreDetails)}}>
                    <img src="/icons/icon-roles.svg" alt="Agregar detalles" />
                    <label>Ver detalles</label>
                </div>

                <div className="inv-add-details" onClick={() => {setIsMoreDetails(!isMoreDetails)}}>
                    <img src="/icons/icon-roles.svg" alt="Agregar detalles" />
                    <label>Generar Factura</label>
                </div>
            </div>
            
        </form>
    </div>
    )
}
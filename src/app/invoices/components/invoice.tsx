import { useState, useEffect, useRef } from "react";
import { secureFetch } from "../../shared/secureFetch";
import { API_URL } from "../../../config/config.brd";
import { useGlobalState } from "../../store/useGlobalState";
import ModalWarn from "../../auth/modal/modal-warn";

export default function Invoice() {
  const types = ["compra", "venta"];
  const [today, setToday] = useState(new Date());

  // estados para el modalwarn
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const formRef = useRef<any>();

  // Estado para más detalles
  const [isMoreDetails, setIsMoreDetails] = useState<boolean>(false);

  const [products, setProducts] = useState<any>([]);

  // "Signal" para hacer el reload de los productos en la factura
  const { signalReload }: any = useGlobalState();

  // Productos selecionados estados
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [productAdded, setProductAdded] = useState<any>([]);

  const getAllProducts = async () => {
    const state = await secureFetch(`${API_URL}productos/getall`, "GET", null);

    if (state?.state.ok) {
      const data = await state.state.json();
      setProducts(data);
    } else {
      const error = await state?.state.status;
      console.log(
        `Error | No se pudieron obtener los productos! code: ${error}`
      );
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [signalReload]);

  const handleAddProduct = (e: any) => {
    e.preventDefault();

    const { product, cantidad } = formRef.current.elements;

    if (product.value === "") {
      setErrorMessage(
        "Error | Para agregar un producto a la factura tienes que elejir un producto!"
      );
      setActive(true);
      return;
    }

    if (cantidad.value === "") {
      setErrorMessage(
        "Error | Para agregar un producto a la factura tienes que especificar la cantidad!"
      );
      setActive(true);
      return;
    }

    if (cantidad.value <= 0) {
      setErrorMessage("Error | La cantidad tiene que ser mayor a 0!");
      setActive(true);
      return;
    }

    const precio = products.find((p: any) => p.id === product.value)?.precio;
    const nombre = products.find((p: any) => p.id === product.value)?.nombre;

    console.log(product.value);
    console.log(cantidad.value);
    console.log(precio);
    const idDetail = crypto.randomUUID();
    setProductAdded([
      ...productAdded,
      {
        id: idDetail.split("-")[0],
        productoId: product.value,
        cantidad: cantidad.value,
        precioIndividual: precio,
        nombre: nombre,
      },
    ]);

    cantidad.value = "";
  };

  const handleRemoveProduct = (id: any) => {
    console.log(`TRATANDO DE FILTRAR id: ${id}`);

    const filteredProducts = productAdded.filter((p: any) => p.id !== id);

    setProductAdded(filteredProducts);
  };

  const handleProductChange = (e: any) => {
    setActualPrice(e.price);

    setSelectedProducts(e);
  };

  const handleSumbit = async (e: any) => {
    e.preventDefault();

    if (productAdded.length === 0) {
      setErrorMessage(
        "Error | Para generar una factura tienes que agregar al menos un producto!"
      );
      setActive(true);
      return;
    }

    const { type, desc, date } = formRef.current.elements;

    if (type.value === "") {
      setErrorMessage(
        "Error | Para agregar un producto a la factura tienes que elejir un tipo!"
      );
      setActive(true);
      return;
    }

    if (desc.value === "") {
      setErrorMessage(
        "Error | Para agregar un producto a la factura tienes que describirlo!"
      );
      setActive(true);
      return;
    }

    if (date.value === "") {
      setErrorMessage("Error | La fecha de la Factura es requerida.");
      setActive(true);
      return;
    }

    setLoading(true);

    const formattedDate = date.value + "T00:00:00"; // assume time is 00:00:00
    const stateFactura = await secureFetch(
      `${API_URL}transacciones/create/${crypto.randomUUID().toString()}`,
      "PUT",
      {
        tipo: type.value,
        fecha: formattedDate,
        descripcion: desc.value.trim(),
        detalles: productAdded,
      }
    );
    if (stateFactura?.state.ok) {
      setLoading(false);
      setProductAdded([]);
      setErrorMessage("Éxito | Factura generada correctamente!");
      setActive(true);

      formRef.current.reset();
    } else {
      const error = await stateFactura?.state.status;
      console.log(`Error | No se pudo generar la factura! code: ${error}`);
      setLoading(false);
      setErrorMessage(`Error | No se pudo generar la factura! code: ${error}`);
      setActive(true);
    }
  };

  return (
    <div className="invoice-form">
      <form ref={formRef} onSubmit={handleAddProduct}>
        <div
          className={`div-with-all-info ${
            isMoreDetails ? "div-with-all-info-2" : ""
          }`}
        >
          <div>
            <div className="invoice-form-inp">
              <label>Tipo de Factura</label>
              <select name="type" id="type">
                {types.map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <div className="invoice-form-inp">
              <label>Fecha</label>
              <input
                type="date"
                name="date"
                id="date"
                min={today.toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div>
            <div className="invoice-form-inp">
              <label>Descripción</label>
              <textarea
                name="desc"
                id="desc"
                placeholder="Descripción de la factura...."
              ></textarea>
            </div>
          </div>

          <div>
            <div className="invoice-form-inp">
              <label>Producto</label>
              <select
                name="product"
                id="product"
                onChange={(e) => {
                  handleProductChange(e.target.value);
                }}
              >
                {products?.map((product: any) => {
                  return (
                    <option
                      key={product.id}
                      value={product.id}
                      data-price={product.precio}
                    >
                      {product.nombre} | ${product.precio}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="invoice-form-inp">
              <label>Cantidad</label>
              <input type="number" name="cantidad" id="cantidad" />
            </div>

            
            <div className="invoice-button">
              <button onClick={handleAddProduct}>
                <img
                  src="/icons/icon-create-product.svg"
                  alt="Icon Create Product"
                />
                Agregar
              </button>
            </div>
          </div>
        </div>

        <div className="product-added-title">
          <p>
            <img src="/icons/icon-product-added.svg" alt="Productos añadidos" />
            Productos agregados
          </p>

          <div className="product-added">
            {productAdded?.length === 0 ? (
              <p>No hay productos agregados</p>
            ) : (
              productAdded?.map((product: any, index: number) => (
                <div
                  onClick={() => handleRemoveProduct(product.id)}
                  key={index}
                >
                  <p>
                    {product.nombre} | x{product.cantidad} | $
                    {product.precioIndividual}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "20px",
            marginBottom: "2rem",
          }}
        >
          <div
            className="inv-add-details"
            onClick={() => {
              setIsMoreDetails(!isMoreDetails);
            }}
          >
            <img src="/icons/icon-roles.svg" alt="Agregar detalles" />
            <label>{isMoreDetails ? "Mostrar menos" : "Mostrar más"}</label>
          </div>

          {loading ? (
            <div className="loader"></div>
          ) : (
            <div
              className="inv-add-details"
              onClick={(e) => {
                handleSumbit(e);
              }}
            >
              <img src="/icons/icon-roles.svg" alt="Agregar detalles" />
              <label>Generar Factura</label>
            </div>
          )}
        </div>
      </form>

        <ModalWarn active={active} setActive={setActive} error={errorMessage} />
    </div>
  );
}

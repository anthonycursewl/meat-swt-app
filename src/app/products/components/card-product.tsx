import './card-product.css'

interface Props {
    nombre: string
    precio: string;
    descripcion: string;
}

export default function CardProduct({ nombre, precio, descripcion}: Props) {
    return (
        <div className='card-product'>
            <div className='card-product-title'>
                <img src="/icons/icon-product-sl.svg" alt="" />
                <p>{nombre}</p>
            </div>

            <div className='card-product-price'>
                <p>$ {precio}</p>
            </div>

            <div className='card-product-description'>
                <textarea name="" id="" value={descripcion} spellCheck="false"></textarea>
            </div>
        </div>
    );
}
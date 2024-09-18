import './card-product.css'
import { ModalOptiosnProducts } from './options-products';
import { useState } from 'react';

interface Props {
    id: string;
    nombre: string
    precio: string;
    descripcion: string;
    info?: any;
}

export default function CardProduct({ nombre, precio, descripcion, id, info }: Props) {
    const [active, setActive] = useState<boolean>(false) 

    const handleOpenModalOptions = () => {
        setActive(!active)
    }

    return (
        <>
        <div className='card-product' onClick={handleOpenModalOptions}>
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

        <ModalOptiosnProducts active={active} setActive={handleOpenModalOptions} info={info}/>
        </>
    )
}
import './roles-options.css'
import { Link } from 'react-router-dom';

interface Props {
    active: boolean;
    id?: string;
    permisos: any;
    setActive: (active: boolean) => void;
}

export const ModalOptinsRoles = ({ active, id, permisos, setActive }: Props) =>  {

    const handleClose = () => {
        if (setActive) {
            setActive(false)
        }
    }

    return (
        <div className={`options_modal ${active ? 'options_modal_active' : ''}`} onClick={handleClose}>
            
            <div className='options_modal_content'>
                <div className='options_close_x'>
                    <img src="/icons/icon-show-role.svg" alt="Logo Close" />
                    <p id='letters-id'>{id?.split('-')[0]}</p>
                </div>
                
                <ul className='options-list-links'>
                    <div className='options-perms'>
                        {
                            permisos?.map((permission: any) => {
                                return (
                                    <>
                                        <p>{permission}</p>
                                    </>
                                )
                            })
                        }
                    </div>

                    <li>
                        <img src="/icons/icon-edit-role.svg" alt="Icon Editar Role" />
                        <Link to={`/dashboard/profile/${id}`}>Editar</Link>
                    </li>
                    <li>
                        <img src="/icons/icon-delete-role.svg" alt="Icon Eliminar Role" />
                        <Link to={`/dashboard/control`}>Eliminar</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}
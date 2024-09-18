import './profile-modal.css'
import { Link } from 'react-router-dom';

interface Props {
    active: boolean;
    setActive?: (active: boolean) => void;
    id?: string;
}

export const ModalProfile = ({ active, setActive, id }: Props) =>  {
    
    const handleClose = () => {
        if (setActive) {
            setActive(false)
        }
    }

    return (
        <div className={`profile_modal ${active ? 'profile_modal_active' : ''}`} onClick={handleClose}>
            
            <div className='profile_modal_content'>
                <div className='profile_close_x' onClick={handleClose}>
                    <img src="/icons/icon-profile.svg" alt="Perfil Logo" />
                    <img src="/icons/icon-modal-verified.svg" alt="Logo Close" />
                </div>
                
                <ul className='list-links'>
                    <li>
                        <img src="/icons/icon-modal-access.svg" alt="Icon Acceso" />
                        <Link to={`/dashboard/control`}>Control de Accesos</Link>
                    </li>
                    <li>
                        <img src="/icons/icon-modal-dashboard.svg" alt="Icon Dashboard" />
                        <Link to={`/dashboard`}>Dashboard</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}
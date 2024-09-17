import './navbar-dash.css'
import { ModalProfile } from '../modal/profile-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eliminarCookie } from '../../auth/services/deleteCookie'

export default function NavbarDash() {
    const [active, setActive] = useState(false)
    const handleCloseProfile = () => {
        setActive(true)
    }

    // Objeto para navegar en las rutas
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/login")
        eliminarCookie('AuthToken')
        eliminarCookie('RefreshToken')
    }

    const getCurrentPath = () => {
        const path = window.location.pathname
        return path
    }

    return (
        <nav className='navbar-dash'>

            <div className='navbar-dash-content'>
                <div className='navbar-logo'>    
                    <img src="/mark/duran-logo-r.webp" alt="Duran Logo" />
                </div>

                <div className='navbar-links'>
                    <div className={`${getCurrentPath() === '/dashboard/roles' ? 'click-profile-active' : null} click-profile`} onClick={() => navigate('/dashboard/roles')}>
                        <p>Roles</p>
                        <img src="/icons/icon-roles-g.svg" alt="Icono para abrir el perfil" />
                    </div>

                    <div className={`${getCurrentPath() === '/dashboard/users' ? 'click-profile-active' : null} click-profile`}  onClick={() => navigate('/dashboard/users')}>
                        <p>Usuarios</p>
                        <img src="/svgs/svg-user-nav.svg" alt="Icono para abrir el apartado de Usuarios" />
                    </div>

                    <div className={`${getCurrentPath() === '/dashboard/users' ? 'click-profile-active' : null} click-profile`}  onClick={() => navigate('/dashboard/products')}>
                        <p>Productos</p>
                        <img src="/icons/icon-products.svg" alt="Icono para abrir el apartado de Usuarios" />
                    </div>

                    <div className='click-profile' onClick={handleLogout}>
                        <p>Logout</p>
                        <img src="/icons/click-profile.svg" alt="Icono para abrir el perfil" />
                    </div>

                </div>
                    <div className='nav-profile' onClick={handleCloseProfile}>
                        <img src="/icons/icon-profile.svg" alt="Icono del Perfil" />
                    </div>
            </div>

            <ModalProfile active={active} setActive={setActive} />
        </nav>

    )

}
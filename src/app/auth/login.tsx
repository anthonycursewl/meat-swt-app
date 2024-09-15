import './css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { thrLogin } from './services/thrLogin';
import { ModalWarn } from './modal/modal-warn';

export default function Login() {   
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Objeto para navegar entre las rutas
    const navigate = useNavigate();

    const formRef = useRef<any>()
    const handleLogin = async (e: any) => {
        e.preventDefault()
        const { username, password } = formRef.current.elements;

        const { error, data } = await thrLogin(username.value, password.value, setLoading)

        if (error) {
            setErrorMessage(error)
            setActive(true)
        }

        if (data) {
            setActive(false)
            setErrorMessage('')

            if (!loading) {
                navigate('/dashboard')
            }
        }
    }

    return (
        <>
        <section className="sec-login"> 
            <div className='sec-login-form'>
                <form className='form-login' ref={formRef} onSubmit={handleLogin}>
                    <div className='form-duran-logo'>
                        <img src="/mark/duran-logo-r.webp" alt="Duran Logo" />
                    </div>

                    <div className='form-inputs'>
                        <label>Correo Electrónico</label>
                        <input type="email" name='username'/>
                    </div>

                    <div className='form-inputs'>
                        <label>Contraseña</label>
                        <input type="password" name='password'/>
                    </div>

                    <div className='form-button'>
                        <button disabled={loading}>Iniciar Sesión</button>
                    </div>

                    <div className='form-recovery'>
                        <Link to={'/password-recovery'}>¿Olvidaste tu contraseña?</Link>
                    </div>
                </form>
            </div>
        </section>

        <ModalWarn active={active} error={errorMessage} setActive={setActive}/>

        <ModalWarn active={loading} error={"Cargando..."}/>
        </>
    )
}
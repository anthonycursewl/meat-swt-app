import './create-user.css'
import NavbarDash from '../dashboard/navbar/navbar-dash'
import { ContainerMain } from '../roles/components/container-main'
import ShowCurrentPath from '../components/ShowCurrentPath'
import { useRef } from 'react'
import ModalWarn from '../auth/modal/modal-warn'
import { useState } from 'react'
import { secureFetch } from '../shared/secureFetch'
import { API_URL } from '../../config/config.brd'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../roles/roles.css'

export default function CreateUser() {
    const formRef = useRef<any>()

    // Estados del Modal para mostrar errores
    const [active, setActive] = useState(false)
    const [error, setError] = useState('')

    // Navigator 
    const navigate = useNavigate()

    const handleCreateNewUser = async (e: any) => {
        e.preventDefault()

        const { email, password, password_confirmation } = formRef.current.elements;

        if (email.value === '' || password.value === '' || password_confirmation.value === '') {
            setError('Error | Todos los campos son obligatorios')
            setActive(true)
            return 
        }
        
        if (password.value !== password_confirmation.value) {
            setError('Error | Las contraseñas no coinciden')
            setActive(true)
            return 
        }

        const stateUser = await secureFetch(`${API_URL}accounts/register`, 'POST', {
            username: email.value.trim(),
            password: password.value.trim(),
        })

        if (!stateUser?.state.ok) {
            setError(`Error | ${stateUser?.state.error}`)
            setActive(true)
        } else {
            setError(`¡Usuario ${email.value.trim()} creado con éxito!`)
            setActive(true)

            setTimeout(() => {
                setActive(false)
                navigate('/dashboard/users')
            }, 1000);
        }
    }

    return (
        <>
            <NavbarDash />

            <ContainerMain>
                <ShowCurrentPath path="Dashboard &gt; Usuarios &gt; Crear usuario"/>

                <div className='user-title'>
                    <img src="/icons/icon-info.svg" alt="" />
                    <p>Puedes editar los usuarios creados en la sección de <Link to="/dashboard/users">Usuarios.</Link></p>
                </div>

                <form className='form-user' ref={formRef} onSubmit={handleCreateNewUser}>
                    
                    <div className='user-group'>
                        <div className='user-title-img'>
                            <img src="/icons/icon-info-user.svg" alt="Información del Usuario a crear" />
                            <h1>Datos del usuario</h1>
                        </div>
                    </div>

                    <div className='user-group'>
                        <div className='user-inputs'>
                            <label>Correo Electrónico</label>
                            <input type="email" name='email' id='email'/>
                        </div>

                        <div className='user-inputs'>
                            <label>Contraseña</label>
                            <input type="password" name='password' id='password'/>
                        </div>

                        <div className='user-inputs'>
                            <label>Confirmar contraseña</label>
                            <input type="password" name='password_confirmation' id='password_confirmation'/>
                        </div>
                    </div>

                    <div className='user-button-group'>
                        <button type="submit">Crear usuario</button>
                    </div>

                </form>

                <ModalWarn setActive={setActive} error={error} active={active}/>
            </ContainerMain>
        </>
    )
}
import './password-recovery.css'
import { useState } from 'react';
import { ModalWarn } from '../auth/modal/modal-warn';
import { sendEmailCode } from './services/send-email-code';
import { useNavigate, Link } from 'react-router-dom';

export default function PasswordRecovery() {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [sendAgain, setSendAgain] = useState(true);

    // clientKey
    const [clientKey, setClientKey] = useState<any>('');

    // Objeto para navegar entre las rutas
    const navigate = useNavigate();
    
    const handleSendEmailCode = async (e: any) => {
        e.preventDefault()

        const { error, data, clientKey } = await sendEmailCode(email, setLoading);

        if (error) {
            setError(error)
            setActive(true)
        }

        if (data) {
            setActive(false)
            setError('')
            setClientKey(clientKey)
        }
    }

    const handleVerifyCode = (code: any) => {
        navigate(`/password-recovery/code/${code}`)
    }

    return (
        <>
        <div className="password-recovery">
            <div className='password-recovery-cn'>

                <form className='pr-form' onSubmit={(e) => {handleSendEmailCode(e)}}>
                    <div className='pr-logo'>
                        <img src="mark/duran-logo-r.webp" alt="Duran Logo" />
                        <h1>Recuperar Contraseña</h1>

                        <div>
                            <p>Ingresa tu correo Electrónico donde se enviará un código X digitos para restablecer tu contraseña.</p>
                        </div>
                    </div>

                    <div className='pr-lb-in'>
                        <div className='pr-lb'>
                            <label className='pr-lb' style={{ gap: ".5rem" }}>
                                <p style={{ color: 'red' }}>@</p> Correo Electrónico
                            </label>
                        </div>

                        <input type="email" placeholder='ejemplo@dominio.com' onChange={e => setEmail(e.target.value)}/>

                        <div className='pr-button'>
                            {loading ?
                                (
                                    sendAgain ?
                                    <div className='loader'></div>
                                    : null
                                )
                                :
                                <button>Enviar Email</button>
                            }

                            <a onClick={() => {handleVerifyCode(clientKey)}} style={{ cursor: 'pointer'}}>Comprobar código</a>
                        </div>
                    </div>

                </form>

            </div>
        </div>

        <ModalWarn active={active} setActive={setActive} error={error}/>
        </>
    );
}
import './modal-warn.css'

interface Props {
    active: boolean;
    error: string;
    setActive?: (active: boolean) => void;
    dynamicFunction?: () => void;
    loading?: boolean;
    zIndex?: number;
}

export const ModalWarn = ({ active, error, setActive, dynamicFunction, loading, zIndex = 1 }: Props) =>  {
    
    const handleClose = () => {
        if (setActive) {
            setActive(false)
        }
    }

    return (
        <div className={`warn_modal ${active ? 'warn_modal_active' : ''}`}>
            <div className='warn_modal_content'>
                {
                    loading ?  (
                        <>
                            <div className='loader'>
                            </div>
                            <br />
                        </>
                    ) 
                    :
                    <div className='wanr_close_x' onClick={handleClose}>
                        <img src="/svgs/close-modal.svg" alt="Logo Close" />
                    </div>
                }

                <div className='warn_logo'>
                   <img src="/mark/duran-logo-r.webp" alt="Duran Logo" /> 
                </div>

                <p style={{ textAlign: 'center'}}>{error}</p>

                {
                    dynamicFunction ? 
                    <button className={`${loading ? 'session_modal_button_loading' : 'session_modal_button'}`} onClick={() => {
                        dynamicFunction()
                        }}>
                        <img src="/session/session-delete.svg" alt="" />
                        {loading ? <div className='loader'></div> : 'Eliminar'}
                    </button> : ""
                }
            </div>
        </div>
    )
}
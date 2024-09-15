import './modal-warn.css'

interface Props {
    active: boolean;
    error: string;
    setActive?: (active: boolean) => void;
}

export const ModalWarn = ({ active, error, setActive }: Props) =>  {
    
    const handleClose = () => {
        if (setActive) {
            setActive(false)
        }
    }

    return (
        <div className={`warn_modal ${active ? 'warn_modal_active' : ''}`}>
            <div className='warn_modal_content'>
                <div className='wanr_close_x' onClick={handleClose}>
                    <img src="svgs/close-modal.svg" alt="Logo Close" />
                </div>

                <div className='warn_logo'>
                   <img src="mark/duran-logo-r.webp" alt="Duran Logo" /> 
                </div>

                <p>{error}</p>
            </div>
        </div>
    )
}
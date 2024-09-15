import { ConfirmDeleteModal } from "./confirm-delete-modal";

interface Session {
    id: string;
    device: string;
    ip: string;
    loginDate: string;
    signalDelete: number;
    setSingalDelete: (value: number) => void;
}

export default function CardSessions({ id, device, ip, loginDate, signalDelete, setSingalDelete }: Session) {

  return (
    <>
        <div className="c-e-session">
            <div className="c-info-all">
                <div className="c-id">
                <img src="/session/session-id.svg" alt="Id de la session" />
                <p>ID</p>
                </div>

                <p id="letters-id">{id.split("-")[0]}</p>
            </div>

            <div className="c-info-all">
                <div className="c-id">
                <img src="/session/session-device.svg" alt="Dispositivo" />
                <p>Dispositivo</p>
                </div>
                <p>{device}</p>
            </div>

            <div className="c-info-all">
                <div className="c-id">
                <img src="/session/session-ip.svg" alt="Direccion IP" />
                <p>Hora</p>
                </div>
                <p>{loginDate.slice(11, 19)}</p>
            </div>

            <div className="c-info-all">
                <div className="c-id">
                <img src="/session/session-date.svg" alt="Direccion IP" />
                <p>Fecha de la Sesión</p>
                </div>
                <p>{loginDate.slice(0, 10)}</p>
            </div>

            <ConfirmDeleteModal id={id} signalDelete={signalDelete} setSingalDelete={setSingalDelete} />
        </div>
    </>
  );
}

import { IRoles } from "../interfaces/intRoles";
import { ModalOptinsRoles } from "../modal/roles-options";
import { useState } from "react";

export default function CardRole({ id, nombre, permisos }: IRoles) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  }

  return (
    <div className="al-roles-group" onClick={() => openModal()}>
      <div className="al-roles-card">

        <div className="al-roles-de">
            <p className="al-role-name">
              <img src="/icons/icon-roles.svg" alt="Icono de rol" />
              Rol
            </p>
        </div>

        <p>{nombre}</p>
      </div>

      <div className="al-roles-card">
        <div className="al-roles-de">
              <p className="al-role-name">
                <img src="/icons/icon-permiso.svg" alt="Icono de Permisos" />
                Permisos
              </p>
          </div>
        <p id="role-perms">{permisos}</p>
      </div>

      <ModalOptinsRoles active={open} id={id} permisos={permisos} setActive={setOpen} nombre={nombre}/>
    </div>
  );
}

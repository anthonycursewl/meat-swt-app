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
        <p className="al-role-name">Rol</p>
        <p>{nombre}</p>
      </div>

      <div className="al-roles-card">
        <p className="al-role-name">Permisos</p>
        <p id="role-perms">{permisos}</p>
      </div>

      <ModalOptinsRoles active={open} id={id} permisos={permisos} setActive={setOpen} nombre={nombre}/>
    </div>
  );
}

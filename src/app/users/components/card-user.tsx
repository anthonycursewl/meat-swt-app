
import { ModalOptinsUsers } from "./user-options";
import { useState } from "react";
import { IUsers } from "../interfaces/AllInterfaces";

export default function CardUser({ id, username, permissions }: IUsers) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  }

  return (
    <div className="al-roles-group" onClick={() => openModal()}>
      <div className="al-roles-card">
        <p className="al-role-name">Correo Electrónico</p>
        <p id="email-user">{username}</p>
      </div>

      <div className="al-roles-card">
        <p className="al-role-name">Rol</p>
        {permissions?.length !== 0 ? permissions.slice(0,1).map((permission: any) => (
            <p>{permission.nombre}</p>
        ))
          : <p>No hay permisos</p>}
      </div>

      <div className="al-roles-card">
        <p className="al-role-name">Permisos</p> 
        {
          permissions?.length === 0 ? <p>N/A</p> : <p>{permissions?.slice(0,1).map((p: any) => p.permisos)}</p>
        }
      </div>

      <div className="al-roles-card">
        <p className="al-role-name">Rol Protegido</p> 
        {
          permissions?.length === 0 ? <p>N/A</p> : <p>{permissions?.map((item: any) => item.id.split('-')[0] )}</p>
        }
      </div>

      <ModalOptinsUsers active={open} id={id} permisos={permissions} setActive={setOpen} nombre={username}/>
    </div>
  );
}

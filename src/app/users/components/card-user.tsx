
import { ModalOptinsUsers } from "./user-options";
import { useState } from "react";
import { IUsers } from "../interfaces/AllInterfaces";

export default function CardUser({ id, username, permissions, userIsProtected }: IUsers) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  }

  return (
    <div className="al-roles-group" onClick={() => openModal()}>
      <div className="al-roles-card">
        <div className="al-roles-de">
              <p className="al-role-name">
                <img src="/icons/icon-email-user.svg" alt="Icono de rol" />
                Email
              </p>
          </div>
        <p id="email-user">{username}</p>
      </div>

      <div className="al-roles-card">
        <div className="al-roles-de">
              <p className="al-role-name">
                <img src="/icons/icon-roles.svg" alt="Icono de rol" />
                Rol
              </p>
          </div>
        {permissions?.length !== 0 ? permissions.slice(0,1).map((permission: any, index: number) => (
            <p key={index}>{permission.nombre}</p>
        ))
          : <p>No hay permisos</p>}
      </div>

      <div className="al-roles-card">
        <div className="al-roles-de">
              <p className="al-role-name">
                <img src="/icons/icon-permiso.svg" alt="Icono de Permisos" />
                Permisos
              </p>
          </div>
        {
          permissions?.length === 0 ? <p>N/A</p> : <p id="email-user">{permissions?.slice(0,1).map((p: any) => p.permisos)}</p>
        }
      </div>

      <div className="al-roles-card">
        <div className="al-roles-de">
              <p className="al-role-name">
                { 
                  userIsProtected ?
                  <img src="/icons/icon-protected.svg" alt="Icono de rol" /> :
                  <img src="/icons/icon-protected.svg" alt="Icono de rol" /> 
                }
                Estado
              </p>
          </div>  
        {userIsProtected ? <p>Protegido</p> : <p>Sin Proteger</p>}
      </div>

      <ModalOptinsUsers active={open} id={id} permisos={permissions} setActive={setOpen} nombre={username} userIsProtected={userIsProtected}/>
    </div>
  );
}

import { ContainerMain } from "./components/container-main";
import ShowCurrentPath from "../components/ShowCurrentPath";
import NavbarDash from "../dashboard/navbar/navbar-dash";
import { useNavigate, useParams } from "react-router-dom";
import { secureFetch } from "../shared/secureFetch";
import { API_URL } from "../../config/config.brd";
import { useState, useEffect, useMemo, act } from "react";
import "./set-role.css";

export default function SetRole() {
  // Recuperar el id del param
  const [user, setUser] = useState({});
  const [allRoles, setAllRoles] = useState([]);
  
  
  const [loadingUser, setLoadingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const { id } = useParams();

  const getAllUsers = async () => {
    setLoading(true);
    const response = await secureFetch(
      `${API_URL}accounts/getallaccounts`,
      "GET",
      null
    );

    if (response?.state.ok) {
      const data = await response.state.json();
      const userFiltered = data?.filter((user: any) => user.id === id)[0];
      setUser(userFiltered);
      setLoading(false);
    } else {
      const error = await response?.state.status;
      console.log(`ERROR ROLES ${error}`);
      setLoading(false);
    }
  };

  const getAllRoles = async () => {
    setLoadingRoles(true);
    const response = await secureFetch(
      `${API_URL}roles/getallroles`,
      "GET",
      null
    );
    if (response?.state.ok) {
      const data = await response.state.json();
      setAllRoles(data);
    }

    setLoadingRoles(false);
  };

  useEffect(() => {

    getAllUsers();
    getAllRoles();
  }, []);

  const getFilteredRoles = useMemo(() => {
    return allRoles?.filter(
      (role: any) => !user?.permissions.map((r: any) => r.id).includes(role.id)
    );
  }, [allRoles, user]);

  const asignarRole = async (active: string) => {
    const newUserPermissions = [...user.permissions, allRoles.find((role: any) => role.id === active)];
    setUser({ ...user, permissions: newUserPermissions });
    const stateSetRole = await secureFetch(
      `${API_URL}roles/setroletouser`,
      "POST",
      {
        userId: id,
        permissionId: active,
      }
    );

    if (stateSetRole?.state.ok) {
      console.log("Rol asignado");
    } else {
      getAllUsers();

      console.log("Error | No se pudo asignar el rol");
    }
  };

  const eliminarRol = async (active: string) => {

    
    const newUserPermissions = user.permissions.filter(role => role.id !== active);
    setUser({ ...user, permissions: newUserPermissions });

    const stateDeleteRole = await secureFetch(
      `${API_URL}roles/deleteroletouser`,
      "DELETE",
      {
        userId: id,
        permissionId: active,
      }
    );

    if (stateDeleteRole?.state.ok) {
      console.log("Rol removido");
    } else {
      getAllUsers();

      console.log("Error | No se pudo remover el rol. Intenta de nuevo!");
    }

  };

  return (
    <>
      <NavbarDash />

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ContainerMain>
          <ShowCurrentPath path="Dashboard &gt; Usuarios &gt; Asignar rol" />

          <div key={user?.id} className="user-title">
            <img src="/icons/icon-info.svg" alt="Icon Información de Roles" />
            <p>
              Gestionando Roles &gt;{" "}
              <span className="user-colors-global">{user?.username}</span>
            </p>
          </div>

          <div>
            <h1>@ Roles Actuales</h1>
          </div>

          <div className="al-roles-d">
            {loadingUser ? (
              <div>Cargando...</div>
            ) : (
              <>
                {user?.permissions?.map((role: any) => (
                  <div
                    key={role.id}
                    className={`al-roles-card-d `}
                    onClick={() => eliminarRol(role.id)}
                  >
                    <img src="/icons/icon-roles.svg" alt="Icono de los Roles" />
                    <p>{role.nombre}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div>
            <h1>@ Roles totales</h1>
          </div>
          <div className="al-roles-d">
            {loadingRoles ? (
              <div>Cargando...</div>
            ) : (
              <>
                {getFilteredRoles?.map((role: any) => (
                  <div key={role.id} className={`al-roles-card-d `}
                    onClick={() => asignarRole(role.id)}
                  >
                    <img src="/icons/icon-roles.svg" alt="Icono de los Roles" />
                    <p>{role.nombre}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </ContainerMain>
      )}
    </>
  );
}

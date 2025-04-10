import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "./components/container-main"
import ShowCurrentPath from "../components/ShowCurrentPath"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import { useEffect, useState, useRef } from "react"
import ModalWarn from "../auth/modal/modal-warn"
import { useNavigate } from "react-router-dom"
import './roles.css'

export default function CreateRole() {
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [addedPermissions, setAddedPermissions] = useState<any>([]);

  const [active, setActive] = useState(false)
  const[error, setError] = useState('')

  const navigate = useNavigate()

  const formRef = useRef<any>();

  const verifyPermissions = (e: any) => {
    const newSelectedPermission = e.target.value;
    
    setSelectedPermissions(newSelectedPermission);
  }

  const getAllPermissionsTypes = async () => {
    const state = await secureFetch(`${API_URL}roles/getallpermissionstypes`, 'GET', null)

    if (!state?.state.ok) {
      console.log(state?.state.error)
    } else {
      const data = await state.state.json()
      setPermissions(data)
    }
  }

  const handleAddPermission = (e: any) => {
    e.preventDefault()
    if (selectedPermissions.length === 0) {
      return
    }

    if (addedPermissions.includes(selectedPermissions)) {
      return
    }

    setAddedPermissions([...addedPermissions, selectedPermissions]);
  }

  const handleRemovePermission = (permissionToRemove: string) => {
    const updatedPermissions = addedPermissions.filter((permission: string) => permission !== permissionToRemove);
    setAddedPermissions(updatedPermissions);
  }

  useEffect(() => {
    getAllPermissionsTypes()
  }, [])

  const handleCreateRole = async (e: any) => {
    e.preventDefault()
    const { name } = formRef.current.elements;

    const body = {
      nombre: name.value.trim(),
      permisos: addedPermissions
    }

    if (body.nombre === '') {
      setActive(true)
      setError('Error | Debes agregar un nombre.')
      return
    }

    if (addedPermissions.length === 0) {
      setActive(true)
      setError('Error | Debes agregar    al menos un permiso.')
      return
    }

    const id_perm = crypto.randomUUID()
    const stateRes = await secureFetch(`${API_URL}roles/createnewpermission/${id_perm}`, 'PUT', body)

    if (!stateRes?.state.ok) {
      console.log(stateRes?.state.error)
      setError(stateRes?.state.error)
      setActive(true)
    } else {
      setActive(false)
      navigate('/dashboard/roles')
      const data = await stateRes.state.text()
      console.log(data)
    }
}

  return (
    <>
      <NavbarDash />

      <ContainerMain>
        <ShowCurrentPath path="Dashboard &gt; Roles &gt; Create"/>

        <h1>Create Role</h1>
        
        <div className="c-roles">

          <form className="al-roles-form" ref={formRef} onSubmit={handleCreateRole}>
            
            <div className="roles-perms-and-name">
              <div className="al-roles-il">
                <label>Nombre de Rol</label>
                <input type="text" name="name" id="name" />
              </div>

              <div className="al-roles-il">
                <label>Permisos</label>
                <select name="perms" id="perms" onChange={(e) => {
                  verifyPermissions(e)
                }}>
                  {
                    permissions.map((permission: any, index: number) => {
                      return (
                        <option value={permission} key={index}>{permission}</option>
                      )
                    })
                  }
                </select>   
              </div>
            </div>

            <div className="al-roles-perms">
              {
                addedPermissions?.map((permission: any) => {
                  return (
                    <div key={permission}>
                      <input
                        type="checkbox"
                        value={permission}
                        checked
                        onChange={() => {handleRemovePermission(permission)}}
                      />
                      <label>{permission}</label>
                    </div>
                  )
                })
              }
            </div>

            <div className="al-button-roles">
              <button onClick={handleAddPermission}>
                <img src="/icons/click-profile.svg" alt="Crear Rol" />
                Agregar Permiso
              </button>
              
              <button type="submit">Crear Rol</button>
            </div>

          </form>
        </div>
      </ContainerMain>
      
        <ModalWarn active={active} setActive={setActive} error={error}/>
    </>
  )
}
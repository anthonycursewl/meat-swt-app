import NavbarDash from "../dashboard/navbar/navbar-dash"
import { ContainerMain } from "./components/container-main"
import ShowCurrentPath from "../components/ShowCurrentPath"
import { secureFetch } from "../shared/secureFetch"
import { API_URL } from "../../config/config.brd"
import { useEffect, useState, useRef } from "react"
import { ModalWarn } from "../auth/modal/modal-warn"
import { useNavigate, useParams } from "react-router-dom"

export default function EditRole() {
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [addedPermissions, setAddedPermissions] = useState<any>([]);
  const [nombreRol, setNombreRol] = useState('')
 
  const [active, setActive] = useState(false)
  const[error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const { id } = useParams();

  const formRef = useRef<any>();

  const getAllRoles = async () => {
    const state = await secureFetch(`${API_URL}roles/getallroles`, 'GET', null)

    if (!state?.state.ok) {
      console.log(state?.state.error)
    } else {
      const data = await state.state.json()

      data?.map((role: any) => {
        if (role.id === id) {
          setAddedPermissions(role.permisos)
          setNombreRol(role.nombre)
        }
      })
    }
  }

  useEffect(() => {
    getAllRoles()
  }, [])


  
  const verifyPermissions = (e: any) => {
    const newSelectedPermission = e.target.value;
    
    setSelectedPermissions(newSelectedPermission);
  }

  const getAllPermissionsTypes = async () => {
    const state = await secureFetch(`${API_URL}roles/getallpermissionstypes`, 'GET', null)
    
    if (!state?.state.ok) {
        console.log(state?.state.error)
        setActive(true)
        setError(state?.state.error)
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

    const updateRole = async (e: any) => {
      e.preventDefault()
      if (addedPermissions.length === 0) {
        return
      }

      if (nombreRol === '') {
        return
      }

      setLoading(true)
      const state = await secureFetch(`${API_URL}roles/editrole/${id}`, 'PUT', {
          nombre: nombreRol.trim(),
          permisos: addedPermissions
      })
      
      setLoading(false)
      if (!state?.state.ok) {
        setError(state?.state.error)
        setActive(true)
      } else {
        setError(`¡Rol ${nombreRol} actualizado con éxito!`)
        setActive(true)

        setTimeout(() => {
          navigate('/dashboard/roles')
        }, 2000)
      }
      
    }
    
    return (
        <>
      <NavbarDash />

      <ContainerMain>
        <ShowCurrentPath path="Dashboard &gt; Roles &gt; Edición"/>

        
        <div className="c-roles">

          <form className="al-roles-form" ref={formRef} onSubmit={updateRole}>
            
            <div className="roles-perms-and-name">
              <div className="al-roles-il">
                <label>Nombre de Rol</label>
                <input type="text" name="name" id="name" value={nombreRol} onChange={(e) => setNombreRol(e.target.value)}/>
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
                {loading !== true ?    
                <button onClick={handleAddPermission}>
                <img src="/icons/click-profile.svg" alt="Crear Rol" />
                Agregar Permiso
              </button>
                : null}
              
              {loading ? <div className="loader"></div> : <button type="submit">Actualiza Rol</button>}
            </div>

          </form>
        </div>
      </ContainerMain>

      <ModalWarn active={active} setActive={setActive} error={error}/>
    </>
  )
}
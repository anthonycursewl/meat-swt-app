import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/auth/login";
import Dashboard from "./app/dashboard/dashboard";
import ProtectedRoutes from "./app/ProtectedRoutes/ProtectedRoutes";
import ControlAcess from "./app/acess/control-acess";
import PasswordRecovery from "./app/recovery/password-recovery";
import Roles from "./app/roles/roles";
import CreateRole from "./app/roles/create-role";
import EditRole from "./app/roles/edit-role";
import Users from "./app/users/users";
import CreateUser from "./app/users/create-user";
import ChangeUserPassword from "./app/users/change-user-password";
import SetRole from "./app/roles/set-role";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/control"
            element={
              <ProtectedRoutes>
                <ControlAcess />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/roles"
            element={
              <ProtectedRoutes>
                <Roles />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/roles/create"
            element={
              <ProtectedRoutes>
                <CreateRole />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/roles/edit/:id"
            element={
              <ProtectedRoutes>
                <EditRole />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users/create"
            element={
              <ProtectedRoutes>
                <CreateUser />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users/change-password/:id"
            element={
              <ProtectedRoutes>
                <ChangeUserPassword />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users/set-role/:id"
            element={
              <ProtectedRoutes>
                <SetRole />
              </ProtectedRoutes>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

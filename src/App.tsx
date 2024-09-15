import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/auth/login";
import Dashboard from "./app/dashboard/dashboard";
import ProtectedRoutes from "./app/ProtectedRoutes/ProtectedRoutes";
import ControlAcess from "./app/acess/control-acess";
import PasswordRecovery from "./app/recovery/password-recovery";

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

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

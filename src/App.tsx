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
import { Navigate } from "react-router-dom";
import Products from "./app/products/products";
import CreateProduct from "./app/products/create-product";
import EditProduct from "./app/products/edit-product";
import Invoices from "./app/invoices/invoices";
import CreateInvoice from "./app/invoices/create-invoice";

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

          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoutes>
                <Products />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/products/create"
            element={
              <ProtectedRoutes>
                <CreateProduct />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/products/edit/:id"
            element={
              <ProtectedRoutes>
                <EditProduct />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/invoices"
            element={
              <ProtectedRoutes>
                <Invoices />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/invoices/create"
            element={
              <ProtectedRoutes>
                <CreateInvoice />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Navigate to={"/dashboard"}/>
              </ProtectedRoutes>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// Cargar de manera lazy papá, aquí de verdad se viene lo bueno oyó
// La gente usualemente se queja de los comentarios, pero es tan fino poder escribir lo que se va a hacer para que 
// la gente no muera en el proceso. 😈🤓

import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProtectedRoutes from "./app/ProtectedRoutes/ProtectedRoutes";

// Abajo de esto solo tenemos los vistas que seran cargadas de manera lazy ¿Por qué? porque a mi se me da la gana.
const Login = lazy(() => import("./app/auth/login"));
const Dashboard = lazy(() => import ("./app/dashboard/dashboard"));
const ControlAcess = lazy(() => import ("./app/acess/control-acess"));
const PasswordRecovery = lazy(() => import ("./app/recovery/password-recovery"));
const Roles = lazy(() => import ("./app/roles/roles"));
const CreateRole =  lazy(() => import ("./app/roles/create-role"));
const EditRole =  lazy(() => import ("./app/roles/edit-role"));
const Users = lazy(() => import ("./app/users/users"));
const CreateUser = lazy(() => import ("./app/users/create-user"));
const ChangeUserPassword = lazy(() => import ("./app/users/change-user-password"));
const SetRole = lazy(() => import ("./app/roles/set-role"));
const Products =  lazy(() => import ("./app/products/products"));
const CreateProduct = lazy(() => import ("./app/products/create-product")); 
const EditProduct = lazy(() => import ("./app/products/edit-product"));
const Invoices = lazy(() => import ("./app/invoices/invoices"));
const CreateInvoice = lazy(() => import ("./app/invoices/create-invoice"));


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
                <Suspense fallback={null}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/control"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <ControlAcess />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/roles"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <Roles />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/roles/create"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <CreateRole />
                </Suspense>
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
                <Suspense fallback={null}>
                  <Users />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users/create"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <CreateUser />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users/change-password/:id"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <ChangeUserPassword />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/users/set-role/:id"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <SetRole />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <Products />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/products/create"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <CreateProduct />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/products/edit/:id"
            element={
              <ProtectedRoutes>
                    <Suspense fallback={null}>
                      <EditProduct />
                    </Suspense>
                </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/invoices"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <Invoices />
                </Suspense>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard/invoices/create"
            element={
              <ProtectedRoutes>
                <Suspense fallback={null}>
                  <CreateInvoice />
                </Suspense>
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

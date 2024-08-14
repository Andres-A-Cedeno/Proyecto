import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Register from "./Register";
import Login from "./Login";
import Home from "./pages/Home";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import UserProvider from "./context/UserContext";

import Cookies from "js-cookie";

// Componente para rutas protegidas
function ProtectedRoute({ children }) {
  const role = Cookies.get("rol");

  if (!role) {
    console.log("No se encontró rol, redirigiendo a /login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Componente para rutas públicas
function PublicRoute({ children }) {
  const role = Cookies.get("rol");

  if (role) {
    console.log("Rol encontrado, redirigiendo a /dashboard");
    return (
      <Navigate
        to={role === "1" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <UserProvider>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </UserProvider>
  );
}

export default App;

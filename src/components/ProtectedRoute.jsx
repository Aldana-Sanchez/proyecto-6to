import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles, redirectTo = "/login", children }) {
  const { user } = useAuth();
  const location = useLocation();

  // No logueado
  if (!user) return <Navigate to={redirectTo} state={{ from: location }} replace />;

  // Dado de baja
  if (user.activo === false) {
    return <Navigate to="/login" state={{ reason: "disabled" }} replace />;
  }

  // Rol no permitido
  if (roles && !roles.includes(user.rol)) return <Navigate to="/" replace />;

  return children;
}

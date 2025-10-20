import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ redirectTo = "/" }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  if (location.pathname.startsWith("/listado") && user.rol !== "profesor") {
    alert("Solo los profesores pueden acceder al listado.");
    return <Navigate to="/inscripcion" />;
  }

  if (location.pathname.startsWith("/inscripcion") && user.rol !== "alumno") {
    return <Navigate to="/listado" />;
  }

  return <Outlet />;
}

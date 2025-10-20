import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../estilo.css";

function BarraSuperior() {
  const { user } = useAuth();

  return (
    <div className="barrita">
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <div className="BARRA">
          {user ? (
            <>
              <Link className="BARRA" to="/">
                Inicio
              </Link>
              {" | "}
              {user.rol === "profesor" ? (
                <Link className="BARRA" to="/listado">
                  Listado
                </Link>
              ) : (
                <Link className="BARRA" to="/inscripcion">
                  Inscripción
                </Link>
              )}
            </>
          ) : (
            <Link className="BARRA" to="/">
              Inicio
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default BarraSuperior;

import React from "react";
import { Link } from "react-router-dom";

function BarraSuperior() {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/">Inicio</Link>{" | "}
      <Link to="/inscripcion">Inscripción</Link>{" | "}
      <Link to="/listado">Listado</Link>
    </nav>
  );
}

export default BarraSuperior;

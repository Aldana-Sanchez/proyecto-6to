import React from "react";
import { Link } from "react-router-dom";
import "../estilo.css";

function BarraSuperior() {
  return (
    <div class ="barrita">
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <div class="BARRA">
      <Link class ="BARRA" to="/inscripcion">Inscripción</Link>{" | "}
      <Link class ="BARRA" to="/listado">Listado</Link>
      </div>
    </nav>
    </div>
  );
}

export default BarraSuperior;
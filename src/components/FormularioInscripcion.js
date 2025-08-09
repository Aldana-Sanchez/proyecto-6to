import React, { useState } from "react";
import "../estilo.css";

function FormularioInscripcion({ onMateriaSeleccionada }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    materiaBasico: "",
    materiaSuperior: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.materiaBasico) {
      onMateriaSeleccionada(formData.materiaBasico);
    } else if (formData.materiaSuperior) {
      onMateriaSeleccionada(formData.materiaSuperior);
    } else {
      alert("Seleccioná al menos una materia.");
    }
  };

  return (
    <div className="pagina">
      <div className="barra-roja"></div>

      <div className="formulario-box">
        <h2>INSCRIPCION<br />A MESAS DE<br />EXAMEN</h2>
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <span className="icono">👤</span>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <span className="icono">👤</span>
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <span className="icono">🪪</span>
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <span className="icono">✉️</span>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
            <span className="icono">📕</span>
            <select
              name="materiaBasico"
              value={formData.materiaBasico}
              onChange={handleChange}
            >
              <option value="">Materia ciclo básico</option>
              <option value="matematica">Matemática</option>
              <option value="lengua">Lengua</option>
              <option value="historia">Historia</option>
            </select>
          </div>

          <div className="campo">
            <span className="icono">📘</span>
            <select
              name="materiaSuperior"
              value={formData.materiaSuperior}
              onChange={handleChange}
            >
              <option value="">Materia ciclo superior</option>
              <option value="programacion">Programación</option>
              <option value="redes">Redes</option>
              <option value="fisica">Física</option>
            </select>
          </div>

          <button type="submit">Inscribirse</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioInscripcion;

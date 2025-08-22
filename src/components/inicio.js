import React, { useState } from "react";
import "../estilo.css";

function Inicio({ onContinuar }) {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
    dni: "",
    rol: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.correo || !formData.contrasena || !formData.dni || !formData.rol) {
      alert("Completa todos los campos y selecciona tu rol.");
      return;
    }
    onContinuar(formData);
  };

  return (
    <div className="pagina">
      <div className="barra-roja"></div>
      <div className="formulario-box">
        <h2>REGISTRO DE USUARIO</h2>
        <form onSubmit={handleSubmit}>
             <div className="campo">
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
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo">
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
            <label>
              <input
                type="radio"
                name="rol"
                value="alumno"
                checked={formData.rol === "alumno"}
                onChange={handleChange}
              />
              Alumno
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="rol"
                value="profesor"
                checked={formData.rol === "profesor"}
                onChange={handleChange}
              />
              Profesor
            </label>
          </div>

          <button type="submit">Continuar</button>
        </form>
      </div>
    </div>
  );
}

export default Inicio;

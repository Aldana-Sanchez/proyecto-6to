import React, { useState } from "react";
import "../estilo.css";

function FormularioInscripcion({ onMateriasSeleccionadas }) {
  const [formData, setFormData] = useState({
    
    materiasBasico: ["", "", "", "", ""],
    materiasSuperior: ["", "", "", "", ""],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e, index, ciclo) => {
    const updatedMaterias = [...formData[ciclo]];
    updatedMaterias[index] = e.target.value;
    setFormData({ ...formData, [ciclo]: updatedMaterias });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const materiasElegidas = [
      ...formData.materiasBasico.filter((m) => m !== ""),
      ...formData.materiasSuperior.filter((m) => m !== ""),
    ];

    if (materiasElegidas.length > 0) {
      onMateriasSeleccionadas(materiasElegidas);
    } else {
      alert("Seleccioná al menos una materia.");
    }
  };

  return (
    <div className="pagina">
      <div className="barra-roja"></div>

      <div className="formulario-box">
        <h2>
          INSCRIPCIÓN <br /> A MESAS DE <br /> EXAMEN
        </h2>

        <form onSubmit={handleSubmit}>
      

          <h3>Materias ciclo básico</h3>
          {formData.materiasBasico.map((materia, i) => (
            <div className="campo" key={`basico-${i}`}>
              <span className="icono">📕</span>
              <select
                value={materia}
                onChange={(e) =>
                  handleSelectChange(e, i, "materiasBasico")
                }
              >
                <option value="">Seleccionar materia</option>
                <option value="matematica">Matemática 1° </option>
                <option value="lengua">Lengua y Literatura 1° </option>
                <option value="historia">Historia 1° </option>
                <option value="fisica">Física 1° </option>
                <option value="biologia">Biologia 1° </option>
                <option value="educacion civica"> Educacion Civica 1° </option>
                <option value="dibujo"> Dibujo 1° </option>
                <option value="geografia"> Geografia 1°</option>

              </select>
            </div>
          ))}

          <h3>Materias ciclo superior</h3>
          {formData.materiasSuperior.map((materia, i) => (
            <div className="campo" key={`superior-${i}`}>
              <span className="icono">📘</span>
              <select
                value={materia}
                onChange={(e) =>
                  handleSelectChange(e, i, "materiasSuperior")
                }
              >
                <option value="">Seleccionar materia</option>
                <option value="programacion">Programación</option>
                <option value="redes">Redes</option>
                <option value="fisica">Física</option>
              </select>
            </div>
          ))}

          <button type="submit">Inscribirse</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioInscripcion;
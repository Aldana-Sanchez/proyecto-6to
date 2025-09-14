import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../estilo.css";

function FormularioInscripcion({ onMateriasSeleccionadas }) {
  const [formData, setFormData] = useState({
    materiasBasico: ["", "", "", "", ""],
    materiasSuperior: ["", "", "", "", ""],
  });
  const [guardando, setGuardando] = useState(false);

  const handleSelectChange = (e, index, ciclo) => {
    const updatedMaterias = [...formData[ciclo]];
    updatedMaterias[index] = e.target.value;
    setFormData({ ...formData, [ciclo]: updatedMaterias });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const materiasElegidas = [
      ...formData.materiasBasico.filter((m) => m !== ""),
      ...formData.materiasSuperior.filter((m) => m !== ""),
    ];

    if (materiasElegidas.length === 0) {
      alert("Seleccioná al menos una materia.");
      return;
    }

    console.log("Intentando guardar en Firestore...", materiasElegidas);
    setGuardando(true);

    try {
      const docRef = await addDoc(collection(db, "inscripciones"), {
        materias: materiasElegidas,
        fecha: new Date(),
      });
      console.log("Documento agregado con ID:", docRef.id);
      alert("Inscripción guardada en Firebase!");
      // llamar al padre SOLO después de guardar con éxito
      onMateriasSeleccionadas(materiasElegidas);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar. Mirá la consola para más info.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="pagina">
      <div className="barra-roja"></div>
      <div className="formulario-box">
        <h2>INSCRIPCIÓN A MESAS DE EXAMEN</h2>
        <form onSubmit={handleSubmit}>
          <h3>Materias ciclo básico</h3>
          {formData.materiasBasico.map((materia, i) => (
            <div className="campo" key={`basico-${i}`}>
              <span className="icono">📕</span>
              <select
                value={materia || ""}                      // <- importante
                onChange={(e) => handleSelectChange(e, i, "materiasBasico")}
              >
                <option value="">Seleccionar materia</option>
                <option value="matematica">Matemática 1°</option>
                <option value="lengua">Lengua y Literatura 1°</option>
                <option value="historia">Historia 1°</option>
                <option value="fisica">Física 1°</option>
                <option value="biologia">Biología 1°</option>
                <option value="educacion civica">Educación Cívica 1°</option>
                <option value="dibujo">Dibujo 1°</option>
                <option value="geografia">Geografía 1°</option>
              </select>
            </div>
          ))}

          <h3>Materias ciclo superior</h3>
          {formData.materiasSuperior.map((materia, i) => (
            <div className="campo" key={`superior-${i}`}>
              <span className="icono">📘</span>
              <select
                value={materia || ""}                      // <- importante
                onChange={(e) => handleSelectChange(e, i, "materiasSuperior")}
              >
                <option value="">Seleccionar materia</option>
                <option value="programacion">Programación</option>
                <option value="redes">Redes</option>
                <option value="fisica">Física</option>
              </select>
            </div>
          ))}

          <button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Inscribirse"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioInscripcion;

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import "../estilo.css";

function FormularioInscripcion({ onMateriasSeleccionadas }) {
  const [formData, setFormData] = useState({
    materiasBasico: ["", "", "", "", ""],
    materiasSuperior: ["", "", "", "", ""],
  });
  const [guardando, setGuardando] = useState(false);

  const { user } = useAuth(); 
  const navigate = useNavigate();

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

    if (materiasElegidas.length > 5) {
      alert("Solo podés elegir hasta 5 materias.");
      return;
    }

    setGuardando(true);

    try {
      await addDoc(collection(db, "inscripciones"), {
        materias: materiasElegidas,
        fecha: new Date(),
        nombre: user?.nombre || "",
        apellido: user?.apellido || "",
        correo: user?.correo || "",
      });

      alert("✅ Inscripción guardada correctamente!");

      if (typeof onMateriasSeleccionadas === "function") {
        onMateriasSeleccionadas(materiasElegidas);
      }

      navigate("/"); 
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar. Mirá la consola para más info.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="pagina">
      <div className="formulario-box">
        <h2>INSCRIPCIÓN A MESAS DE EXAMEN</h2>
        <form onSubmit={handleSubmit}>
          <h3>Materias ciclo básico</h3>
          {formData.materiasBasico.map((materia, i) => (
            <div className="campo" key={`basico-${i}`}>
              <span className="icono">📕</span>
              <select
                value={materia || ""}
                onChange={(e) => handleSelectChange(e, i, "materiasBasico")}
              >
                <option value="">Seleccionar materia</option>
                <option value="matematica1">Matemática 1°</option>
                <option value="matematica2">Matemática 2°</option>
                <option value="lengua1">Lengua y Literatura 1°</option>
                <option value="lengua2">Lengua y Literatura 2°</option>
                <option value="historia1">Historia 1°</option>
                <option value="historia2">Historia 2°</option>
                <option value="fisica1">Física 1°</option>
                <option value="fisica2">Física 2°</option>
                <option value="fisica3">Física 3°</option>
                <option value="biologia1">Biología 1°</option>
                <option value="biologia2">Biología 2°</option>
                <option value="civica1">Educación Cívica 1°</option>
                <option value="civica2">Educación Cívica 2°</option>
                <option value="civica3">Educación Cívica 3°</option>
                <option value="dibujo1">Dibujo 1°</option>
                <option value="dibujo2">Dibujo 2°</option>
                <option value="geografia1">Geografía 1°</option>
                <option value="geografia2">Geografía 2°</option>
              </select>
            </div>
          ))}

          <h3>Materias ciclo superior</h3>
          {formData.materiasSuperior.map((materia, i) => (
            <div className="campo" key={`superior-${i}`}>
              <span className="icono">📘</span>
              <select
                value={materia || ""}
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

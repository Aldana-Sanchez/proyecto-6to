import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Detalle() {
  const { id } = useParams();
  const [inscripcion, setInscripcion] = useState(null);

  useEffect(() => {
    const fetchInscripcion = async () => {
      try {
        const docRef = doc(db, "inscripciones", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInscripcion(docSnap.data());
        } else {
          console.log("No se encontró la inscripción con ese ID.");
        }
      } catch (error) {
        console.error("Error al obtener la inscripción:", error);
      }
    };

    fetchInscripcion();
  }, [id]);

  if (!inscripcion) return <p className="mensaje-carga">Cargando datos...</p>;

  return (
    <div className="listado-contenedor">
      <h2 className="titulo-listado">📄 Detalle de inscripción</h2>

      <div className="detalle-box">
        <p><strong>🆔 ID:</strong> {id}</p>
        <p><strong>👤 Nombre:</strong> {inscripcion.nombre || "—"}</p>
        <p><strong>👤 Apellido:</strong> {inscripcion.apellido || "—"}</p>
        <p><strong>📧 Correo:</strong> {inscripcion.correo || "—"}</p>
        <p><strong>🕓 Fecha:</strong> {new Date(inscripcion.fecha.seconds * 1000).toLocaleString()}</p>

        <h3 style={{ marginTop: "20px" }}>📘 Materias inscritas:</h3>
        <ul>
          {inscripcion.materias?.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detalle;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Detalle() {
  const { id } = useParams(); // obtiene el id de la URL
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
   if (!inscripcion) return <p>Cargando datos...</p>;

  return (
    <div className="pagina">
      <h2>Detalle de inscripción</h2>
      <p><strong>Fecha:</strong> {new Date(inscripcion.fecha.seconds * 1000).toLocaleString()}</p>
      <p><strong>Materias inscritas:</strong></p>
      <ul>
        {inscripcion.materias?.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export default Detalle;
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../estilo.css";

function PanelProfesor() {
  const [inscripciones, setInscripciones] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerInscripciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inscripciones"));
        const datos = {};

        querySnapshot.forEach((doc) => {
          const materias = doc.data().materias || [];
          materias.forEach((materia) => {
            if (!datos[materia]) datos[materia] = [];
            datos[materia].push({ id: doc.id, ...doc.data() });
          });
        });

        setInscripciones(datos);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerInscripciones();
  }, []);

  if (cargando) return <p>Cargando inscripciones...</p>;

  return (
    <div className="pagina">
      <div className="barra-roja"></div>
      <div className="formulario-box">
        <h2>📋 Panel del Profesor</h2>

        {Object.keys(inscripciones).length === 0 ? (
          <p>No hay inscripciones registradas aún.</p>
        ) : (
          Object.entries(inscripciones).map(([materia, lista]) => (
            <div key={materia} className="materia-panel">
              <h3>📘 {materia.toUpperCase()}</h3>
              <ul>
                {lista.map((item, index) => (
                  <li key={index}>
                    <strong>ID:</strong> {item.id} <br />
                    <strong>Fecha:</strong>{" "}
                    {item.fecha?.toDate
                      ? item.fecha.toDate().toLocaleString()
                      : item.fecha.toString()}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PanelProfesor;

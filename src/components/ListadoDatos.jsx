import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

export default function ListadoDatos() {
  const [inscripciones, setInscripciones] = useState([]);

  const obtenerDatos = async () => {
    const snap = await getDocs(collection(db, "inscripciones"));
    setInscripciones(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      await deleteDoc(doc(db, "inscripciones", id));
      obtenerDatos();
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Listado de inscripciones</h2>
      <h3>Toque ID para el resto de la Información </h3>

      {inscripciones.length === 0 ? (
        <p>No hay inscripciones registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Materias</th><th>Fecha</th><th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map(item => (
              <tr key={item.id}>
                <td>
                  <Link to={`/detalle/${item.id}`}>{item.id}</Link>
                </td>
                <td>{(item.materias || []).join(", ")}</td>
                <td>
                  {item.fecha
                    ? new Date(
                        item.fecha.seconds ? item.fecha.seconds * 1000 : item.fecha
                      ).toLocaleString()
                    : "-"}
                </td>
                <td>
                  <button onClick={() => eliminar(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

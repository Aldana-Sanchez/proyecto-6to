import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function ListadoDatos() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  const fetchData = async () => {
    setCargando(true);
    try {
      const snapshot = await getDocs(collection(db, "inscripciones"));
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setInscripciones(items);
      console.log("Datos leídos:", items);
    } catch (err) {
      console.error("Error leyendo inscripciones:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este registro?")) return;
    try {
      await deleteDoc(doc(db, "inscripciones", id));
      setInscripciones(inscripciones.filter(i => i.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <div className="cuadro">
      <h2>Inscripciones</h2>
      <button onClick={fetchData} disabled={cargando}>
        {cargando ? "Cargando..." : "Refrescar lista"}
      </button>
      <div className="contenido-cuadro">
        {inscripciones.length === 0 ? (
          <p>No hay inscripciones guardadas.</p>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Materias</th><th>Fecha</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {inscripciones.map(item => (
                <tr key={item.id}>
                  <td style={{fontSize:12}}>{item.id}</td>
                  <td>{(item.materias || []).join(", ")}</td>
                  <td>{item.fecha ? new Date(item.fecha.seconds ? item.fecha.seconds * 1000 : item.fecha).toLocaleString() : "-"}</td>
                  <td><button onClick={() => handleDelete(item.id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

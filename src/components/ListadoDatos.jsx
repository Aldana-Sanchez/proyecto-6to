import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function ListadoDatos() {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "inscripciones"));
      const datos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInscripciones(datos);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Listado de inscripciones</h2>
      {inscripciones.length === 0 ? (
        <p>No hay inscripciones guardadas todavía.</p>
      ) : (
        <ul>
          {inscripciones.map((ins) => (
            <li key={ins.id}>
              <strong>Materias:</strong> {ins.materias.join(", ")} <br />
              <small>
                {new Date(ins.fecha.seconds * 1000).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListadoDatos;

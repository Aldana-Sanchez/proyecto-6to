import React from "react";
import MateriaMatematica from "./MateriaMatematica";



function MateriasSeleccionadas({ materias, volver }) {
  return (
    <div className="pagina-materia">
      <h2>Inscripción confirmada </h2>
      <p>Materias seleccionadas:</p>
       <ul>
        {materias.map((m, i) => (
          <li key={i}>
            {m === "matematica" && "Matemática"}
          </li>
        ))}
      </ul>

      {materias.includes("matematica") && <MateriaMatematica />}

     

      <button onClick={volver}>Volver</button>
    </div>
  );
}

export default MateriasSeleccionadas;



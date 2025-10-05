import React from "react";
import MateriaMatematica from "./materiaMatematica";
import MateriaFisica from "./materiaFisica";
import MateriaHistoria1 from "./materiahistoria1";
import MateriaBiologia1 from "./materiabiologia1";
import MateriaDibujo1 from "./materiadibujo1";
import MateriaGeografia1 from "./materiageografia1";

function MateriasSeleccionadas({ materias, volver }) {
  const componentesMaterias = {
    matematica: <MateriaMatematica />,
    fisica: <MateriaFisica />,
    historia: <MateriaHistoria1 />,
    biologia: <MateriaBiologia1 />,
    dibujo: <MateriaDibujo1 />,
    geografia: <MateriaGeografia1 />,
  };

  return (
    <div className="pagina-materia">
      <h2>✅ Inscripción confirmada</h2>
      <p>Materias seleccionadas:</p>

      <ul>
        {materias.map((m, i) => (
          <li key={i}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </li>
        ))}
      </ul>

      <div className="detalle-materias">
        {materias.map((m) => (
          <div key={m}>{componentesMaterias[m]}</div>
        ))}
      </div>

      <button onClick={volver}>Volver</button>
    </div>
  );
}

export default MateriasSeleccionadas;

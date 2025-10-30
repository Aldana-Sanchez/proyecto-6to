import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MateriaMatematica from "./materiaMatematica.js";
import MateriaFisica from "./materiaFisica.js";
import MateriaHistoria1 from "./materiahistoria1.js";
import MateriaHistoria2 from "./materiahistoria2.js";
import MateriaBiologia1 from "./materiabiologia1.js";
import MateriaDibujo1 from "./materiadibujo1.js";
import MateriaGeografia1 from "./materiageografia1.js";
import MateriaProgramacion from "./materiaProgramacion.js";
import Materiabiologia2 from "./materiabiologia2.js";
import Materiacivica1 from "./materiacivica1.js";
import Materiacivica2 from "./materiacivica2.js";
import Materiacivica3 from "./materiacivica3.js";
import Materiadibujo2 from "./materiadibujo2.js";
import Materiafisica2 from "./materiafisica2.js";
import Materiafisica3 from "./materiafisica3.js";
import Materiageografia2 from "./materiageografia2.js";
import Materialengua2 from "./materialengua2.js";
import Materiamatematica2 from "./materiamatematica2.js";

function MateriasSeleccionadas() {
  const location = useLocation();
  const navigate = useNavigate();
  const materias = location.state?.materias || [];

  const componentesMaterias = {
    matematica1: <MateriaMatematica />,
    fisica1: <MateriaFisica />,
    historia1: <MateriaHistoria1 />,
    historia2: <MateriaHistoria2 />,
    biologia1: <MateriaBiologia1 />,
    dibujo1: <MateriaDibujo1 />,
    geografia1: <MateriaGeografia1 />,
    programacion: <MateriaProgramacion />,
    matematica2: <Materiamatematica2 />,
    biologia2: <Materiabiologia2 />,
    civica1: <Materiacivica1 />,
    civica2: <Materiacivica2 />,
    civica3: <Materiacivica3 />,
    dibujo2: <Materiadibujo2 />,
    fisica2: <Materiafisica2 />,
    fisica3: <Materiafisica3 />,
    geografia2: <Materiageografia2 />,
    lengua2: <Materialengua2 />,
  };

  return (
    <div className="pagina-materia">
      <h2>✅ Inscripción confirmada</h2>
      {materias.length > 0 ? (
        <>
          <p>Materias seleccionadas:</p>
          <ul>
            {materias.map((m, i) => (
              <li key={i}>{m.charAt(0).toUpperCase() + m.slice(1)}</li>
            ))}
          </ul>

          <div className="detalle-materias">
            {materias.map((m) => (
              <div key={m} className="cuadro-materia">
                {componentesMaterias[m] || <p>{m}</p>}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No se recibieron materias seleccionadas.</p>
      )}

      <button onClick={() => navigate("/inscripcion")}>Volver</button>
    </div>
  );
}

export default MateriasSeleccionadas;

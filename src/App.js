import React, { useState } from "react";
import Inicio from "./components/inicio";
import FormularioInscripcion from "./components/FormularioInscripcion";
import MateriasSeleccionadas from "./components/materiaselegidas";
import PanelProfesor from "./components/PanelProfesor"; 
import "./estilo.css";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [materias, setMaterias] = useState([]);

  const seleccionarMaterias = (materiasSeleccionadas) => {
    setMaterias(materiasSeleccionadas);
    setPantalla("materia");
  };

  const volverAlFormulario = () => {
    setPantalla("formulario");
    setMaterias([]);
  };

  return (
    <>
      {pantalla === "inicio" && (
        <Inicio
          onContinuar={(usuarioRegistrado) => {
            setUsuario(usuarioRegistrado);

           
            if (usuarioRegistrado.rol === "profesor") {
              setPantalla("profesor");
            } else {
              setPantalla("formulario");
            }
          }}
        />
      )}

      {pantalla === "formulario" && (
        <FormularioInscripcion
          onMateriasSeleccionadas={seleccionarMaterias}
          usuario={usuario}
        />
      )}

      {pantalla === "materia" && (
        <MateriasSeleccionadas
          volver={volverAlFormulario}
          materias={materias}
        />
      )}

      {pantalla === "profesor" && <PanelProfesor />}
    </>
  );
}

export default App;

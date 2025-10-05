import React, { useState } from "react";
import Inicio from "./components/inicio";
import FormularioInscripcion from "./components/FormularioInscripcion";
import MateriasSeleccionadas from "./components/materiaselegidas";
import "./estilo.css"; // estilos personalizados
import { db } from "./firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [materias, setMaterias] = useState([]);

  //firebase
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
            setPantalla("formulario");
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
    </>
  );
}

export default App;

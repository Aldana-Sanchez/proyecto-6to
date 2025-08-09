import React, { useState } from "react";
import FormularioInscripcion from "./components/FormularioInscripcion";
import MateriaMatematica from "./components/MateriaMatematica";


function App() {
  const [materiaVista, setMateriaVista] = useState("");

  const seleccionarMateria = (materia) => {
    setMateriaVista(materia);
  };

  const volverAlFormulario = () => {
    setMateriaVista("");
  };

  return (
    <>
      {materiaVista === "" && (
        <FormularioInscripcion onMateriaSeleccionada={seleccionarMateria} />
      )}
      {materiaVista === "matematica" && (
        <MateriaMatematica volver={volverAlFormulario} />
      )}
      
    </>
  );
}

export default App;

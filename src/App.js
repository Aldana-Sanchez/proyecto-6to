import React, { useState } from "react";
import FormularioInscripcion from "./components/FormularioInscripcion";
import MateriaMatematica from "./components/MateriaMatematica";


function App() {
<<<<<<< HEAD
  return ( 
    <div className="app">
      <BarraSuperior />
      <div className="contenido-principal">
        <FormularioInscripcion />
      </div>
    </div>
=======
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
>>>>>>> 81af61b12b2a97dc3e3303b1d1d0a8222f1ab30c
  );
}

export default App;

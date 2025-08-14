import React from 'react';
import './estilo.css';
import FormularioInscripcion from './components/FormularioInscripcion';
import BarraSuperior from './components/BarraSuperior';

function App() {
  return ( 
    <div className="app">
      <BarraSuperior />
      <div className="contenido-principal">
        <FormularioInscripcion />
      </div>
    </div>
  );
}

export default App;

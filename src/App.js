import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import BarraSuperior from "./components/BarraSuperior";
import FormularioInscripcion from "./components/FormularioInscripcion";
import ListadoDatos from "./components/ListadoDatos";
import Detalle from "./components/Detalle";
import Inicio from "./components/inicio";
import "./estilo.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BarraSuperior />
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/inscripcion" element={<FormularioInscripcion />} />
            <Route path="/listado" element={<ListadoDatos />} />
            <Route path="/detalle/:id" element={<Detalle />} />
          </Route>

          <Route
            path="*"
            element={<div style={{ padding: 20 }}>404 - Página no encontrada</div>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

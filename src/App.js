// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import BarraSuperior from "./BarraSuperior";
import ListadoDatos from "./ListadoDatos";
import FormularioInscripcion from "./FormularioInscripcion";
import Detalle from "./components/Detalle";
import Inicio from "./components/inicio";
import PanelProfesor from "./components/PanelProfesor";
import LoginPage from "./components/LoginPage";

import "./estilo.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BarraSuperior />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/listado" element={<ListadoDatos />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/inscripcion" element={<FormularioInscripcion />} />
            <Route path="/panel" element={<PanelProfesor />} />
          </Route>

          <Route path="*" element={<div style={{padding:20}}>404 - Página no encontrada</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

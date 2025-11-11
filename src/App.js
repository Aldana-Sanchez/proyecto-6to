import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormularioInscripcion from "./pages/FormularioInscripcion";
import PanelProfesor from "./pages/PanelProfesor";
import MisInscripciones from "./pages/MisInscripciones";
import NotFound from "./pages/NotFound";
import AdminUsuarios from "./pages/AdminUsuarios"; 

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

import "./estilo.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <NavBar />

          <Box component="main" sx={{ flex: 1, mt: 2 }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ALUMNO */}
              <Route
                path="/inscripcion"
                element={
                  <ProtectedRoute roles={["alumno"]}>
                    <FormularioInscripcion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/misinscripciones"
                element={
                  <ProtectedRoute roles={["alumno"]}>
                    <MisInscripciones />
                  </ProtectedRoute>
                }
              />

              {/* PROFESOR */}
              <Route
                path="/panelprofesor"
                element={
                  <ProtectedRoute roles={["profesor"]}>
                    <PanelProfesor />
                  </ProtectedRoute>
                }
              />

              {/*ADMIN*/}
              <Route
                path="/admin/usuarios"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminUsuarios />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;

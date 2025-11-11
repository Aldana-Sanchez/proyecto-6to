import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <AppBar position="static" className="navbar" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="titulo-navbar">
          Inscripciones
        </Typography>

        {!user && (
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} to="/" className="boton-nav">Inicio</Button>
            <Button component={RouterLink} to="/login" className="boton-nav">Ingresar</Button>
            <Button component={RouterLink} to="/register" className="boton-nav boton-outline">Registrarse</Button>
          </Stack>
        )}

        {user && (
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} to="/" className="boton-nav">Inicio</Button>

            {user.rol === "alumno" && (
              <>
                <Button component={RouterLink} to="/inscripcion" className="boton-nav">Inscripción</Button>
                <Button component={RouterLink} to="/misinscripciones" className="boton-nav">Mis inscripciones</Button>
              </>
            )}

            {user?.rol === "profesor" && (
              <>
                <Button component={RouterLink} to="/panelprofesor" color="inherit">
                     Panel
                </Button>
              </>
            )}

            {user.rol === "admin" && (
  <>
    <Button component={RouterLink} to="/admin/usuarios" className="boton-nav">
      Panel
    </Button>
  </>
)}


            <Button
              onClick={async () => { await logout(); nav("/login"); }}
              className="boton-nav boton-outline"
            >
              Salir
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase/firebase"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Container, Typography, TextField, Button, Paper, Stack, Alert,
  InputAdornment, IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google"; 

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await signInWithEmailAndPassword(auth, correo, contraseña);
      const ref = doc(db, "usuarios", userCred.user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setError("Usuario no encontrado en la base de datos.");
        return;
      }

      const data = snap.data();
      if (data.rol === "alumno") navigate("/inscripcion");
      else if (data.rol === "profesor") navigate("/panelprofesor");
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          uid: user.uid,
          nombre: user.displayName?.split(" ")[0] || "",
          apellido: user.displayName?.split(" ")[1] || "",
          correo: user.email,
          rol: "alumno",
          activo: true,
        });
      }

      const data = (await getDoc(ref)).data();
      if (data.rol === "alumno") navigate("/inscripcion");
      else if (data.rol === "profesor") navigate("/panelprofesor");
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="auth-wrapper">
      <Container maxWidth="sm">
        <Paper className="auth-card">
          <Typography variant="h4" className="auth-title">Iniciar sesión</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleEmailLogin}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Contraseña"
                type={showPass ? "text" : "password"}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" size="large" className="btn-primary">Iniciar sesión</Button>
            </Stack>
          </form>

          <Typography align="center" sx={{ my: 2 }} className="auth-sub">o</Typography>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            className="btn-outline"
          >
            Iniciar con Google
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

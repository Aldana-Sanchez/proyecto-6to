import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Container, Typography, TextField, Button, Grid, Paper, Stack, Alert,
  InputAdornment, IconButton, FormControl, InputLabel, Select,
  MenuItem, Checkbox, ListItemText
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "", apellido: "", correo: "", dni: "",
    contraseña: "", confirmar: "", rol: "alumno",
    materiasProfesor: [],
  });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const MATERIAS = [
  "Biología 1",
  "Biología 2",
  "Cívica 1",
  "Cívica 2",
  "Cívica 3",
  "Dibujo 1",
  "Dibujo 2",
  "Física 1",
  "Física 2",
  "Física 3",
  "Geografía 1",
  "Geografía 2",
  "Historia 1",
  "Historia 2",
  "Lengua 2",
  "Matemática 1",
  "Matemática 2",
  "Programación",
  "Redes",
  "Web Dinámica",
  "Web Estática",
  "Ética y Deontología",
  "Automatización",
  "Inglés Técnico 1",
  "Inglés Técnico 2",
  "Computación Gráfica",
  "Organización y Arquitectura 1",
  "Organización y Arquitectura 2"

  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const validarContraseña = (pass) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.contraseña !== form.confirmar)
      return setError("Las contraseñas no coinciden.");
    if (!validarContraseña(form.contraseña))
      return setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
    if (!/^\d{1,8}$/.test(form.dni))
      return setError("El DNI debe tener solo números (hasta 8 dígitos).");

    try {
      const cred = await createUserWithEmailAndPassword(auth, form.correo, form.contraseña);
      await setDoc(doc(db, "usuarios", cred.user.uid), {
        uid: cred.user.uid,
        rol: form.rol,
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        dni: form.dni,
        materiasProfesor: form.rol === "profesor" ? form.materiasProfesor : [],
        activo: true,
      });

      if (form.rol === "profesor") navigate("/panelprofesor");
      else navigate("/inscripcion");
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario. Intenta con otro correo.");
    }
  };

  const handleMateriasProfesor = (e) => {
    const value = e.target.value;
    if (value.length <= 3) setForm({ ...form, materiasProfesor: value });
  };

  return (
    <div className="auth-wrapper">
      <Container maxWidth="sm">
        <Paper className="auth-card">
          <Typography variant="h4" className="auth-title">Registro de usuario</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nombre" name="nombre" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Apellido" name="apellido" onChange={handleChange} required />
                </Grid>
              </Grid>

              <TextField fullWidth label="Correo electrónico" type="email" name="correo" onChange={handleChange} required />
              <TextField fullWidth label="DNI" name="dni" inputProps={{ maxLength: 8 }} onChange={handleChange} required />

              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select name="rol" value={form.rol} label="Rol" onChange={handleChange}>
                  <MenuItem value="alumno">Ex-alumno</MenuItem>
                  <MenuItem value="profesor">Profesor</MenuItem>
                </Select>
              </FormControl>

              {form.rol === "profesor" && (
                <FormControl fullWidth>
                  <InputLabel>Materias (máx. 3)</InputLabel>
                  <Select
                    multiple
                    value={form.materiasProfesor}
                    onChange={handleMateriasProfesor}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {MATERIAS.map((m) => (
                      <MenuItem key={m} value={m}>
                        <Checkbox checked={form.materiasProfesor.includes(m)} />
                        <ListItemText primary={m} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <TextField
                fullWidth
                label="Contraseña"
                type={showPass ? "text" : "password"}
                name="contraseña"
                onChange={handleChange}
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

              <TextField
                fullWidth
                label="Confirmar contraseña"
                type={showPass ? "text" : "password"}
                name="confirmar"
                onChange={handleChange}
                required
              />

              <Button type="submit" size="large" className="btn-primary">
                Continuar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

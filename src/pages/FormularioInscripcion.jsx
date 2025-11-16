import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  Divider,
} from "@mui/material";

//  Materias disponibles como componentes 
import MateriaBiologia1 from "../components/materiabiologia1";
import MateriaBiologia2 from "../components/materiabiologia2";
import MateriaCivica1 from "../components/materiacivica1";
import MateriaCivica2 from "../components/materiacivica2";
import MateriaCivica3 from "../components/materiacivica3";
import MateriaDibujo1 from "../components/materiadibujo1";
import MateriaDibujo2 from "../components/materiadibujo2";
import MateriaFisica2 from "../components/materiafisica2";
import MateriaFisica3 from "../components/materiafisica3";
import MateriaGeografia1 from "../components/materiageografia1";
import MateriaGeografia2 from "../components/materiageografia2";
import MateriaHistoria2 from "../components/materiahistoria2";
import MateriaLengua1 from "../components/materialengua1";
import MateriaLengua2 from "../components/materialengua2";
import MateriaMatematica1 from "../components/materiamatematica1";
import MateriaMatematica2 from "../components/materiamatematica2";

export default function FormularioInscripcion() {
  const { user } = useAuth();
  const [materias, setMaterias] = useState([]);
  const [alerta, setAlerta] = useState("");
  const [inscripcionExistente, setInscripcionExistente] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState(null);

  const ALL_MATERIAS = [
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
    "Lengua 1",
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
    "Organización y Arquitectura 2",
  ];

  // Cargar datos del usuario
  useEffect(() => {
    const cargarUsuario = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setDatosUsuario(snap.data());
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };
    cargarUsuario();
  }, [user]);

  // Cargar inscripción previa (si existe)
  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "inscripciones", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setMaterias(snap.data().materias || []);
          setInscripcionExistente(true);
        }
      } catch (err) {
        console.error("Error al obtener inscripción:", err);
      }
    };
    cargarDatos();
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMaterias(typeof value === "string" ? value.split(",") : value);
  };

  // Guardar/actualizar inscripción
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const nombre =
        datosUsuario?.nombre || user?.displayName?.split(" ")[0] || "Sin nombre";
      const apellido =
        datosUsuario?.apellido || user?.displayName?.split(" ")[1] || "";
      const correo = datosUsuario?.correo || user?.email || "";

      const ref = doc(collection(db, "inscripciones"), user.uid);
      await setDoc(
        ref,
        {
          alumnoId: user.uid,
          alumnoNombre: nombre,
          alumnoApellido: apellido,
          alumnoCorreo: correo,
          materias,
          fecha: serverTimestamp(),
        },
        { merge: true }
      );

      setInscripcionExistente(true);
      setAlerta(" Inscripción guardada con éxito");
      setTimeout(() => setAlerta(""), 4000);
    } catch (err) {
      console.error(err);
      setAlerta(" Error al guardar inscripción");
    }
  };

  // Render dinámico de la ficha de cada materia seleccionada
  const mostrarMateria = (nombre) => {
    switch (nombre) {
      case "Biología 1": return <MateriaBiologia1 />;
      case "Biología 2": return <MateriaBiologia2 />;
      case "Cívica 1": return <MateriaCivica1 />;
      case "Cívica 2": return <MateriaCivica2 />;
      case "Cívica 3": return <MateriaCivica3 />;
      case "Dibujo 1": return <MateriaDibujo1 />;
      case "Dibujo 2": return <MateriaDibujo2 />;
      case "Física 2": return <MateriaFisica2 />;
      case "Física 3": return <MateriaFisica3 />;
      case "Geografía 1": return <MateriaGeografia1 />;
      case "Geografía 2": return <MateriaGeografia2 />;
      case "Historia 2": return <MateriaHistoria2 />;
      case "Lengua 1": return <MateriaLengua1 />;
      case "Lengua 2": return <MateriaLengua2 />;
      case "Matemática 1": return <MateriaMatematica1 />;
      case "Matemática 2": return <MateriaMatematica2 />;
      default:
        return (
          <Typography variant="body2" color="text.secondary">
            (No hay información disponible para esta materia)
          </Typography>
        );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Inscripción a mesas de examen
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Bienvenido{" "}
          <strong>
            {datosUsuario?.nombre || user?.displayName?.split(" ")[0]}{" "}
            {datosUsuario?.apellido || user?.displayName?.split(" ")[1]}
          </strong>
          . Seleccioná las materias a las que querés inscribirte.
        </Typography>

        {alerta && (
          <Alert
            severity={alerta.includes("✅") ? "success" : "error"}
            sx={{ mb: 3 }}
          >
            {alerta}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Materias</InputLabel>
              <Select
                multiple
                value={materias}
                onChange={handleChange}
                label="Materias"
                MenuProps={{ PaperProps: { style: { maxHeight: 400 } } }}
              >
                {ALL_MATERIAS.map((materia) => (
                  <MenuItem key={materia} value={materia}>
                    {materia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" fullWidth>
                  {inscripcionExistente ? "Actualizar inscripción" : "Guardar inscripción"}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" fullWidth onClick={() => setMaterias([])}>
                  Limpiar selección
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </form>

        {/* Información de materias seleccionadas */}
        {materias.length > 0 && (
          <Paper sx={{ mt: 4, p: 3, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Información de las materias seleccionadas:
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {materias.map((m) => (
                <Paper key={m} sx={{ p: 2, backgroundColor: "#fff" }}>
                  <Typography variant="h6">{m}</Typography>
                  <Divider sx={{ my: 1 }} />
                  {mostrarMateria(m)}
                </Paper>
              ))}
            </Stack>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

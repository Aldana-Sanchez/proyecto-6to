import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
} from "@mui/material";

export default function PanelProfesor() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState([]);
  const [materiasProfesor, setMateriasProfesor] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;
      try {
        // Obtener las materias del profesor
        const usuarioRef = doc(db, "usuarios", user.uid);
        const usuarioSnap = await getDoc(usuarioRef);
        if (usuarioSnap.exists()) {
          const datos = usuarioSnap.data();
          setMateriasProfesor(datos.materiasProfesor || []);
        }

        // Obtener todas las inscripciones
        const q = query(collection(db, "inscripciones"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setInscripciones(data);
      } catch (err) {
        console.error("Error al cargar inscripciones:", err);
      }
    };
    cargarDatos();
  }, [user]);

  //Filtrar inscripciones solo de las materias del profesor
  const inscripcionesFiltradas = inscripciones.filter((i) =>
    i.materias?.some((m) => materiasProfesor.includes(m))
  );

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, color: "#914b25" }}
      >
        Panel del Profesor
      </Typography>

      {materiasProfesor.length === 0 ? (
        <Typography variant="body1">
          No se encontraron materias asignadas a este profesor.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {materiasProfesor.map((materia) => {
            const alumnos = inscripcionesFiltradas.filter((i) =>
              i.materias.includes(materia)
            );

            return (
              <Grid item xs={12} md={4} key={materia}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      color: "#914b25",
                    }}
                  >
                    {materia}
                  </Typography>

                  {alumnos.length === 0 ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      No hay alumnos inscriptos en esta materia.
                    </Typography>
                  ) : (
                    alumnos.map((a) => (
                      <AlumnoCard key={a.id} alumno={a} />
                    ))
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

//Componente interno para cada alumno
function AlumnoCard({ alumno }) {
  const [estadoActivo, setEstadoActivo] = useState(true);

  useEffect(() => {
    const verificarEstado = async () => {
      try {
        const ref = doc(db, "usuarios", alumno.alumnoId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setEstadoActivo(data.activo !== false);
        }
      } catch (err) {
        console.error("Error verificando estado del alumno:", err);
      }
    };
    verificarEstado();
  }, [alumno.alumnoId]);

  return (
    <Box
      sx={{
        mb: 1.5,
        p: 1.5,
        borderRadius: "10px",
        backgroundColor: estadoActivo ? "#f9f9f9" : "#f0f0f0",
        opacity: estadoActivo ? 1 : 0.6,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: estadoActivo ? "normal" : "bold",
          color: estadoActivo ? "inherit" : "#888",
          textDecoration: estadoActivo ? "none" : "line-through",
        }}
      >
        {alumno.alumnoApellido}, {alumno.alumnoNombre} —{" "}
        {alumno.alumnoCorreo}
      </Typography>

      {!estadoActivo && (
        <Chip
          label="Dado de baja"
          color="error"
          size="small"
          sx={{
            mt: 1,
            fontWeight: "bold",
            bgcolor: "#ffebee",
            color: "#c62828",
          }}
        />
      )}
    </Box>
  );
}

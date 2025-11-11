import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Paper, Grid, Stack } from "@mui/material";

export default function PanelProfesor() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const query = await getDocs(collection(db, "inscripciones"));
      const data = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const filtradas = data.filter((d) =>
        d.materias?.some((m) => user.materiasProfesor?.includes(m))
      );
      setInscripciones(filtradas);
    };
    cargar();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Panel del Profesor
      </Typography>

      {inscripciones.length === 0 ? (
        <Typography variant="body1">No hay inscripciones para tus materias.</Typography>
      ) : (
        <Grid container spacing={3}>
          {user.materiasProfesor.map((materia) => (
            <Grid item xs={12} md={6} key={materia}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{materia}</Typography>
                <Stack spacing={1}>
                  {inscripciones
                    .filter((i) => i.materias?.includes(materia))
                    .map((i) => (
                      <Typography key={i.id}>
                        {i.alumnoApellido}, {i.alumnoNombre} — {i.alumnoCorreo}
                      </Typography>
                    ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

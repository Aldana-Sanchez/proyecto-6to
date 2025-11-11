import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import {
  Container, Typography, Button, Grid, Paper,
  FormControl, InputLabel, Select, MenuItem, Stack, Alert
} from "@mui/material";

import MateriaProgramacion from "../components/materiaProgramacion";
import Materiafisica1 from "../components/materiaFisica";
import Materiafisica2 from "../components/materiafisica2";
import Materiafisica3 from "../components/materiafisica3";
import Materiabiologia1 from "../components/materiabiologia1";
import Materiabiologia2 from "../components/materiabiologia2";
import Materiacivica1 from "../components/materiacivica1";
import Materiacivica2 from "../components/materiacivica2";
import Materiacivica3 from "../components/materiacivica3";
import Materiadibujo1 from "../components/materiadibujo1";
import Materiadibujo2 from "../components/materiadibujo2";
import Materiageografia1 from "../components/materiageografia1";
import Materiageografia2 from "../components/materiageografia2";
import Materialengua2 from "../components/materialengua2";
import Materiahistoria1 from "../components/materiahistoria1";
import Materiahistoria2 from "../components/materiahistoria2";

const MAP = {
  programacion: MateriaProgramacion,
  fisica1: Materiafisica1,
  fisica2: Materiafisica2,
  fisica3: Materiafisica3,
  biologia1: Materiabiologia1,
  biologia2: Materiabiologia2,
  civica1: Materiacivica1,
  civica2: Materiacivica2,
  civica3: Materiacivica3,
  dibujo1: Materiadibujo1,
  dibujo2: Materiadibujo2,
  geografia1: Materiageografia1,
  geografia2: Materiageografia2,
  lengua2: Materialengua2,
  historia1: Materiahistoria1,
  historia2: Materiahistoria2,
};

// lista completa de materias disponibles
const ALL_MATERIAS = Object.keys(MAP);

export default function MateriasElegidas() {
  const { user } = useAuth();
  const [materias, setMaterias] = useState([]);
  const [nueva, setNueva] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const cargar = async () => {
      if (!user) return;
      const ref = doc(collection(db, "inscripciones"), user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setMaterias(snap.data().materias || []);
      }
    };
    cargar();
  }, [user]);

  const agregarMateria = async () => {
    if (!nueva) return;
    if (materias.includes(nueva)) {
      setAlert("Ya estás inscripto en esa materia.");
      return;
    }
    try {
      const ref = doc(collection(db, "inscripciones"), user.uid);
      await updateDoc(ref, { materias: arrayUnion(nueva) });
      setMaterias([...materias, nueva]);
      setNueva("");
      setShowAdd(false);
      setAlert("Materia agregada con éxito ✅");
    } catch {
      setAlert("Error al agregar la materia.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Mis materias inscriptas</Typography>
        <Button variant="contained" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "Cancelar" : "Agregar materia"}
        </Button>
      </Stack>

      {alert && (
        <Alert severity="info" onClose={() => setAlert("")} sx={{ mb: 2 }}>
          {alert}
        </Alert>
      )}

      {showAdd && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Seleccioná una nueva materia para agregar
          </Typography>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Materia</InputLabel>
              <Select
                label="Materia"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
              >
                <MenuItem value=""><em>—</em></MenuItem>
                {ALL_MATERIAS.map((m) => (
                  <MenuItem key={m} value={m} disabled={materias.includes(m)}>
                    {m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={agregarMateria}>Agregar</Button>
          </Stack>
        </Paper>
      )}

      <Grid container spacing={3}>
        {materias.length > 0 ? (
          materias.map((m) => {
            const Componente = MAP[m];
            return (
              <Grid item xs={12} sm={6} md={4} key={m}>
                <Paper sx={{ p: 2, borderLeft: "5px solid #0d9488" }}>
                  {Componente ? (
                    <Componente />
                  ) : (
                    <Typography variant="body1">{m}</Typography>
                  )}
                </Paper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">Todavía no te inscribiste en ninguna materia.</Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

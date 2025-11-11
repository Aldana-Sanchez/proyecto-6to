import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Alert,
} from "@mui/material";

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
import Materiahistoria2 from "../components/materiahistoria2";
import Materialengua1 from "../components/materialengua1";
import Materialengua2 from "../components/materialengua2";
import Materiamatematica1 from "../components/materiamatematica1";
import Materiamatematica2 from "../components/materiamatematica2";

const MATERIAS_COMPONENTES = {
  biologia1: Materiabiologia1,
  biologia2: Materiabiologia2,
  civica1: Materiacivica1,
  civica2: Materiacivica2,
  civica3: Materiacivica3,
  dibujo1: Materiadibujo1,
  dibujo2: Materiadibujo2,
  fisica2: Materiafisica2,
  fisica3: Materiafisica3,
  geografia1: Materiageografia1,
  geografia2: Materiageografia2,
  historia2: Materiahistoria2,
  lengua1: Materialengua1,
  lengua2: Materialengua2,
  matematica1: Materiamatematica1,
  matematica2: Materiamatematica2,
};

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .replace(/[^a-z0-9]/g, "");

export default function MisInscripciones() {
  const { user } = useAuth();
  const [inscripcion, setInscripcion] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "inscripciones", user.uid);
        const snap = await getDoc(ref);
        setInscripcion(snap.exists() ? snap.data() : null);
      } catch (err) {
        console.error("Error al cargar inscripción:", err);
      }
    };
    cargar();
  }, [user]);

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#b35a1f", fontWeight: "bold" }}>
        Mis Inscripciones
      </Typography>

      {!inscripcion ? (
        <Alert severity="info">Todavía no te inscribiste a ninguna materia.</Alert>
      ) : (
        <Card
          sx={{
            width: "85%",
            maxWidth: "900px",
            backgroundColor: "#f6c89f",
            border: "2px solid #b35a1f",
            borderRadius: "15px",
            mb: 4,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            {/* Datos del alumno */}
            <Typography variant="h6" sx={{ color: "#5a2d0c", fontWeight: "bold", mb: 1 }}>
              Alumno:{" "}
              <span style={{ fontWeight: "normal" }}>
                {inscripcion.alumnoApellido} {inscripcion.alumnoNombre}
              </span>
            </Typography>

            <Typography variant="body1" sx={{ color: "#5a2d0c", mb: 2 }}>
              Correo: {inscripcion.alumnoCorreo}
            </Typography>

            <Typography variant="body1" sx={{ color: "#5a2d0c", mb: 2 }}>
              Fecha de inscripción:{" "}
              {inscripcion.fecha?.toDate ? inscripcion.fecha.toDate().toLocaleString() : ""}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "#b35a1f" }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#b35a1f", mb: 2 }}>
              Materias inscritas:
            </Typography>

            <Grid container spacing={3}>
              {inscripcion.materias && inscripcion.materias.length > 0 ? (
                inscripcion.materias.map((m, i) => {
                  const clave = normalizar(m);        
                  const Componente = MATERIAS_COMPONENTES[clave];

                  return (
                    <Grid item xs={12} md={6} key={i}>
                      <Box
                        sx={{
                          backgroundColor: "#fff5eb",
                          borderRadius: "10px",
                          p: 2,
                          border: "1px solid #e68a2e",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: "#b35a1f", fontWeight: "bold", mb: 1, textTransform: "capitalize" }}
                        >
                          {m}
                        </Typography>

                        {Componente ? (
                          <Componente />
                        ) : (
                          <Typography variant="body2">
                            No hay información disponible para esta materia.
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <Alert severity="info">No hay materias en esta inscripción.</Alert>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

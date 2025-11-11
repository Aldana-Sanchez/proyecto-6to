import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Box, Card, CardContent, Typography, Divider, Grid } from "@mui/material";

import materiaBiologia1 from "../components/materiabiologia1";
import materiaDibujo1 from "../components/materiadibujo1";
import materiaDibujo2 from "../components/materiadibujo2";
import materiaFisica from "../components/materiaFisica";
import materiaFisica2 from "../components/materiafisica2";
import materiaGeografia1 from "../components/materiageografia1";
import materiaGeografia2 from "../components/materiageografia2";
import materiaHistoria1 from "../components/materiahistoria1";
import materiaHistoria2 from "../components/materiahistoria2";

const MATERIAS_INFO = {
  "Biología 1": materiaBiologia1,
  "Dibujo 1": materiaDibujo1,
  "Dibujo 2": materiaDibujo2,
  "Física 1": materiaFisica,
  "Física 2": materiaFisica2,
  "Geografía 1": materiaGeografia1,
  "Geografía 2": materiaGeografia2,
  "Historia 1": materiaHistoria1,
  "Historia 2": materiaHistoria2,
};

const MisInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const obtenerInscripciones = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(collection(db, "inscripciones"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const datos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const fecha =
            data.fecha?.seconds
              ? new Date(data.fecha.seconds * 1000)
              : new Date(data.fecha || Date.now());
          return { ...data, fecha };
        });

        setInscripciones(datos);
      } catch (error) {
        console.error("Error al cargar inscripciones:", error);
      }
    };

    obtenerInscripciones();
  }, [auth, db]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "#b35a1f",
          fontWeight: "bold",
        }}
      >
        Mis Inscripciones
      </Typography>

      {inscripciones.length === 0 ? (
        <Typography variant="body1">Todavía no te inscribiste a ninguna materia.</Typography>
      ) : (
        inscripciones.map((insc, index) => (
          <Card
            key={index}
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
              {/* Fecha de inscripción */}
              <Typography
                variant="h6"
                sx={{ color: "#5a2d0c", fontWeight: "bold", mb: 2 }}
              >
                Fecha de inscripción:{" "}
                <span style={{ fontWeight: "normal" }}>
                  {new Date(insc.fecha).toLocaleString()}
                </span>
              </Typography>

              <Divider sx={{ my: 2, borderColor: "#b35a1f" }} />

              {/* Lista de materias */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#b35a1f", mb: 2 }}
              >
                Materias inscritas:
              </Typography>

              <Grid container spacing={2}>
                {Array.isArray(insc.materias) &&
                  insc.materias.map((materia, i) => {
                    const info = MATERIAS_INFO[materia] || {};
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
                            sx={{ color: "#b35a1f", fontWeight: "bold", mb: 1 }}
                          >
                            {materia}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#5a2d0c", mb: 1 }}
                          >
                            <strong>Contenido:</strong>{" "}
                            {info.contenido || "Información no disponible"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#5a2d0c" }}>
                            <strong>Consulta:</strong>{" "}
                            {info.consulta || "Horario no informado"}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MisInscripciones;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Container, Paper, Typography } from "@mui/material";

export default function Detalle() {
  const { id } = useParams();
  const [data,setData]=useState(null);

  useEffect(()=>{
    const run = async ()=>{
      const snap=await getDoc(doc(db,"inscripciones",id));
      if (snap.exists()) setData(snap.data());
    };
    run();
  },[id]);

  if(!data) return null;

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Detalle de inscripción</Typography>
        <Typography>ID: {id}</Typography>
        <Typography>Alumno: {(data.alumnoApellido||"")+" "+(data.alumnoNombre||"")}</Typography>
        <Typography>Correo: {data.alumnoCorreo||""}</Typography>
        <Typography>Materias: {(data.materias||[]).join(", ")}</Typography>
        <Typography>Fecha: {data.fecha?.toDate ? data.fecha.toDate().toLocaleString() : ""}</Typography>
      </Paper>
    </Container>
  );
}

import { useEffect, useState } from "react";
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Switch } from "@mui/material";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AdminUsuarios(){
  const [rows,setRows]=useState([]);

  const cargar = async ()=>{
    const snap = await getDocs(collection(db,"usuarios"));
    setRows(snap.docs.map(d=>({ id:d.id, ...d.data() })));
  };

  useEffect(()=>{ cargar(); },[]);

  const toggle = async (id,activo)=>{
    await updateDoc(doc(db,"usuarios",id),{ activo: !activo });
    cargar();
  };

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Usuarios</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Activo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r=>(
              <TableRow key={r.id}>
                <TableCell>{(r.apellido||"")+" "+(r.nombre||"")}</TableCell>
                <TableCell>{r.correo}</TableCell>
                <TableCell>{r.rol}</TableCell>
                <TableCell><Switch checked={r.activo!==false} onChange={()=>toggle(r.id,r.activo!==false)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

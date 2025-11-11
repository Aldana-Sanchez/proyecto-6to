import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
} from "@mui/material";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AdminUsuarios() {
  const [rows, setRows] = useState([]);

  // Cargar lista de usuarios
  const cargar = async () => {
    const snap = await getDocs(collection(db, "usuarios"));
    setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    cargar();
  }, []);

  // Cambia el  estado de activo ainactivo
  const toggle = async (id, activo) => {
    await updateDoc(doc(db, "usuarios", id), { activo: !activo });
    cargar();
  };

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#b35a1f", fontWeight: "bold", mb: 3 }}
        >
          Usuarios
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Correo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Activo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r) => {
              const inactivo = r.activo === false;
              return (
                <TableRow
                  key={r.id}
                  sx={{
                    backgroundColor: inactivo ? "#f5f5f5" : "inherit",
                    opacity: inactivo ? 0.7 : 1,
                  }}
                >
                  <TableCell
                    sx={{
                      color: inactivo ? "#888" : "inherit",
                      textDecoration: inactivo ? "line-through" : "none",
                    }}
                  >
                    {(r.apellido || "") + " " + (r.nombre || "")}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: inactivo ? "#888" : "inherit",
                      textDecoration: inactivo ? "line-through" : "none",
                    }}
                  >
                    {r.correo}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: inactivo ? "#888" : "inherit",
                      textDecoration: inactivo ? "line-through" : "none",
                    }}
                  >
                    {r.rol}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={r.activo !== false}
                      onChange={() => toggle(r.id, r.activo !== false)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

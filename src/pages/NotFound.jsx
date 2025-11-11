import { Container, Typography } from "@mui/material";
export default function NotFound(){
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>404</Typography>
      <Typography>Página no encontrada</Typography>
    </Container>
  );
}

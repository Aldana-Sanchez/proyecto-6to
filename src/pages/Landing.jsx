import { Container, Grid, Paper, Typography, Button, Stack, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Landing() {
  return (
    <Container maxWidth="lg" className="landing-container">
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8} className="landing-hero">
          <Typography variant="h1" className="landing-title" sx={{ fontSize:{ xs: 36, md: 48 } }}>
            Mesas de examen
          </Typography>
          <Typography variant="body1" className="auth-sub" sx={{ mb: 3 }}>
            Una forma <strong>simple y rápida</strong> para que los <strong>ex-alumnos</strong> puedan inscribirse en mesas de examen.
            Acceso por rol, panel docente y registro con Google o correo.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ flexWrap:"wrap", rowGap:1 }}>
            <Button variant="contained" size="large" component={RouterLink} to="/login" className="btn-primary">
              Ingresar
            </Button>
            <Button variant="outlined" size="large" component={RouterLink} to="/register" className="btn-outline">
              Crear cuenta
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="landing-card paper-soft">
            <Typography variant="h3" sx={{ mb: 1 }}>¿Qué ofrece esta página?</Typography>
            <Stack spacing={1}>
              <Typography>• Inscripción rápida y organizada a mesas de examen.</Typography>
              <Typography>• Dirigida exclusivamente a ex-alumnos.</Typography>
              <Typography>• Acceso con Google o correo.</Typography>
              <Typography>• Panel docente para visualizar inscriptos.</Typography>
              <Typography>• Panel de Administrador para visualizar a los usuarios y poder darlos de baja (no elimina)</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper className="paper-soft" style={{ marginTop: 24, padding: 20 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>Integrantes del grupo</Typography>
        <div className="chips-row">
          <Chip label="Valdés Venegas Agustina" className="landing-chip" />
          <Chip label="Sanchez Aldana" className="landing-chip" />
          <Chip label="Vivanco Catalina" className="landing-chip" />
          <Chip label="Amenabar Luciana" className="landing-chip" />
        </div>
      </Paper>
    </Container>
  );
}

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Typography variant="h6" component="h3">
        Contáctanos
      </Typography>

      <div className="footer-columns">
        <div className="footer-column">
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
             Gmail
          </Typography>
          <p>agustinavaldesvenegas@gmail.com</p>
          <p>sanchezaldana578@gmail.com</p>
          <p>catalina.a.vivanco@gmail.com</p>
          <p>lu09.amenabar@gmail.com</p>
        </div>

        <div className="footer-column">
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Instagram
          </Typography>
          <a href="https://www.instagram.com/agus21.02/" target="_blank" rel="noopener noreferrer">
            @agus21.02
          </a>
          <a href="https://www.instagram.com/alldiiuu/" target="_blank" rel="noopener noreferrer">
            @alldiiuu
          </a>
          <a href="https://www.instagram.com/caatuup/" target="_blank" rel="noopener noreferrer">
            @caatuup
          </a>
          <a href="https://www.instagram.com/the_sploinky_niko/" target="_blank" rel="noopener noreferrer">
            @the_sploinky_niko
          </a>
        </div>
      </div>

      <Typography variant="body2">
        Porfa widi aprobanos 💔
      </Typography>
    </Box>
  );
}

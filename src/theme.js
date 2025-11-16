import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#bf6b0bff", contrastText: "#ffffff" },   
    secondary: { main: "#1e40af" },                          
    background: { default: "#f0fdfa", paper: "#ffffff" },  
    text: { primary: "#0f172a", secondary: "#334155" },
  },
  typography: {
    fontFamily: "'Inter','Roboto','Helvetica','Arial',sans-serif",
    fontSize: 16,    
    h1: { fontSize: 48, fontWeight: 800, lineHeight: 1.1 },
    h2: { fontSize: 34, fontWeight: 700, lineHeight: 1.2 },
    h3: { fontSize: 28, fontWeight: 700 },
    body1: { fontSize: 18 }, 
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16, boxShadow: "0 6px 24px rgba(13,148,136,.12)" } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, paddingInline: 18, paddingBlock: 10 } } },
    MuiAppBar: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});

export default theme;

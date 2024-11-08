import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a3e4d7 ",
    },
    secondary: {
      main: "#f39c12 ",
    },
    error: {
      main: "#f44336",
    },
    discreteGrey: {
      main: "#5e7a87",
    },
    buttonGrey: {
      main: "#a5b7c0",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;

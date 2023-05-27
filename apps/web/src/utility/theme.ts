import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1877f2",
    },
    secondary: {
      main: "#44BBA4",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: { primary: "#383230" },
  },
});

export default theme;

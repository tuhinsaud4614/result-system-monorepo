import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active":
          {
            "-webkit-box-shadow": "0 0 0px 1000px white inset",
          },
        "input:-webkit-autofill": {
          "-webkit-text-fill-color": "transparent !important",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#854621",
    },
    secondary: {
      main: "#ff6d1f",
    },
    background: {
      default: "#ffffff",
      paper: "#fdfcf7",
    },
    text: { primary: "#383230" },
  },
});

export default theme;

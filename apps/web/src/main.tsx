import * as React from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";
import store from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider
          theme={createTheme({
            palette: {
              primary: {
                main: "#854621",
              },
              secondary: {
                main: "#ff6d1f",
              },
              background: {
                default: "#ffffff",
                paper: "#faf3e1",
              },
              text: { primary: "#383230" },
            },
          })}
        >
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

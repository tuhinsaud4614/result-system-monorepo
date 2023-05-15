import * as React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./app/app";
import store from "./app/store";
import theme from "./utility/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
        <CssBaseline />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
);

import * as React from "react";

import { Route, Routes } from "react-router-dom";

import { API_ROUTE } from "@result-system/shared/utility";

import LoginLoader from "../pages/login/Loader";

const LoginPage = React.lazy(() => import("../pages/login"));

export function App() {
  return (
    <Routes>
      <Route
        path={API_ROUTE.auth.main}
        element={
          <React.Suspense fallback={<LoginLoader />}>
            <LoginPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default App;

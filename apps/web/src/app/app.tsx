import React from "react";

import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { API_ROUTE } from "@result-system/shared/utility";

import Layout from "../components/layout";
import PageNotFound from "../pages/404";
import Dashboard from "../pages/dashboard";
import LoginLoader from "../pages/login/Loader";

const LoginPage = React.lazy(() => import("../pages/login"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />} errorElement={<PageNotFound />}>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <React.Suspense fallback="Loading...">
              <Dashboard />
            </React.Suspense>
          }
        />
      </Route>
      <Route
        path={API_ROUTE.auth.main}
        element={
          <React.Suspense fallback={<LoginLoader />}>
            <LoginPage />
          </React.Suspense>
        }
      />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

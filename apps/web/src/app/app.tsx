import React from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "../components/layout";
import PersistLogin from "../features/auth/PersistLogin";
import RequireAuth from "../features/auth/RequireAuth";
import UnProtected from "../features/auth/UnProtected";
import PageNotFound from "../pages/404";
import Dashboard from "../pages/dashboard";
import LoginPageSkeleton from "../pages/login/Skeleton";
import { WEB_PATHS } from "../utility/constants";

const LoginPage = React.lazy(() => import("../pages/login"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={WEB_PATHS.dashboard}
      element={<PersistLogin />}
      errorElement={<PageNotFound />}
    >
      <Route element={<RequireAuth />}>
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
      </Route>
      <Route path={WEB_PATHS.login} element={<UnProtected />}>
        <Route
          index
          element={
            <React.Suspense fallback={<LoginPageSkeleton />}>
              <LoginPage />
            </React.Suspense>
          }
        />
      </Route>
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

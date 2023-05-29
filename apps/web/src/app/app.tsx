import * as React from "react";

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
import AdminAddUserPageSkeleton from "../pages/admin/users/add-user/Skeleton";
import Dashboard from "../pages/dashboard";
import LoginPageSkeleton from "../pages/login/Skeleton";
import { WEB_PATHS } from "../utility/constants";

const LoginPage = React.lazy(() => import("../pages/login"));
const AdminUsersPage = React.lazy(() => import("../pages/admin/users"));
const AdminAddUserPage = React.lazy(
  () => import("../pages/admin/users/add-user"),
);

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
          <Route
            path={WEB_PATHS.admin.users}
            element={
              <React.Suspense fallback={<AdminAddUserPageSkeleton />}>
                <AdminUsersPage />
              </React.Suspense>
            }
          />
          <Route
            path={WEB_PATHS.admin.addUser}
            element={
              <React.Suspense fallback={<AdminAddUserPageSkeleton />}>
                <AdminAddUserPage />
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
      {/* <Route
         handle={{ crumb: "users" }}
         path={WEB_PATHS.admin.users}
         element={<Layout />}
       >
         <Route
           index
           element={
             <React.Suspense
               fallback={
                 <CircularProgress
                   sx={{ height: "6.25rem", width: "6.25rem" }}
                 />
               }
             >
               <AdminAddUser />
             </React.Suspense>
           }
         />
       </Route> */}
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

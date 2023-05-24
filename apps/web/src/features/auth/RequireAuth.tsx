import { Navigate, Outlet, useLocation } from "react-router-dom";

import { WEB_PATHS } from "../../utility/constants";
import { useAppSelector } from "../../utility/hooks";
import { getAuthUser } from "./auth.slice";

export default function RequireAuth() {
  const user = useAppSelector(getAuthUser);
  const location = useLocation();

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={WEB_PATHS.login} state={{ from: location }} replace />;
}

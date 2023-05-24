import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../utility/hooks";
import { getAuthUser } from "./auth.slice";

export default function UnProtected() {
  const user = useAppSelector(getAuthUser);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

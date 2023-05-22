import { Typography } from "@mui/material";
import _ from "lodash";

import { useAppSelector } from "../../utility/hooks";
import { getAuthUserRole } from "./auth.slice";

export default function SidebarUserRole() {
  const role = useAppSelector(getAuthUserRole);

  return (
    role && (
      <Typography variant="h6" component="h1">
        {_.capitalize(role)} Panel
      </Typography>
    )
  );
}

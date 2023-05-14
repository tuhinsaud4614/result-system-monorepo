import { Typography } from "@mui/material";

import AuthContainer from "../../components/auth/Container";
import Login from "../../features/auth/Login";

export default function LoginPage() {
  return (
    <AuthContainer>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        mb={2}
        color="secondary.main"
      >
        Result System
      </Typography>
      <Login />
    </AuthContainer>
  );
}

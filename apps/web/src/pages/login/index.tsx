import { Typography } from "@mui/material";

import Login from "../../features/auth/Login";
import Wrapper from "./Wrapper";

export default function LoginPage() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

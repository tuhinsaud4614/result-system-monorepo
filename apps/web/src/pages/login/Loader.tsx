import { Skeleton } from "@mui/material";

import AuthContainer from "../../components/auth/Container";

export default function LoginLoader() {
  return (
    <AuthContainer>
      <Skeleton width="60%" height="2rem" sx={{ mb: 2, mx: "auto" }} />
      <Skeleton width="100%" height="3.5rem" />
      <Skeleton width="100%" height="3.5rem" />
      <Skeleton width="100%" height="2.25rem" />
    </AuthContainer>
  );
}

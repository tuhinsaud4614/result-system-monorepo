import * as React from "react";

import { Button, TextField } from "@mui/material";

// interface FormState extends RegisterInput {
//   avatar: File | undefined;
// }

export default function Login() {
  const usernameId = React.useId();
  const passwordId = React.useId();

  return (
    <form>
      <TextField
        variant="outlined"
        id={usernameId}
        label="Username"
        placeholder="Enter your username..."
        sx={{ mb: 2 }}
        fullWidth
        required
      />

      <TextField
        variant="outlined"
        id={passwordId}
        label="Password"
        placeholder="Enter the password..."
        sx={{ mb: 2 }}
        fullWidth
        required
      />
      <Button variant="contained" type="submit" fullWidth>
        Login
      </Button>
    </form>
  );
}

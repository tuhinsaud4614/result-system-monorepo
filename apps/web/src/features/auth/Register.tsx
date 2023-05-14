import * as React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

// interface FormState extends RegisterInput {
//   avatar: File | undefined;
// }

export default function Register() {
  const firstNameId = React.useId();
  const lastNameId = React.useId();
  const passwordId = React.useId();
  const confirmPasswordId = React.useId();

  return (
    <form>
      <TextField
        variant="outlined"
        id={firstNameId}
        label="First Name"
        placeholder="Enter the first name..."
        sx={{ mb: 2 }}
        fullWidth
        required
      />
      <TextField
        variant="outlined"
        id={lastNameId}
        label="Last Name"
        placeholder="Enter the last name..."
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
      <TextField
        variant="outlined"
        id={confirmPasswordId}
        label="Confirm Password"
        placeholder="Enter the confirm password..."
        sx={{ mb: 2 }}
        fullWidth
        required
      />
      <Button variant="contained" type="submit" fullWidth>
        Create Account
      </Button>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">Already have an account?</Typography>
      </Box>
    </form>
  );
}

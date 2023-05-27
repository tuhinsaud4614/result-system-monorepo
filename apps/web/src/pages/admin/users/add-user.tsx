import { Box, Paper, Typography } from "@mui/material";

import Form from "./Form";

export default function AdminAddUser() {
  return (
    <Box
      sx={({ breakpoints }) => ({
        maxWidth: breakpoints.values.md,
        mx: "auto",
      })}
    >
      <Typography
        variant="h5"
        component="h3"
        sx={{ mb: 2 }}
        fontWeight={(theme) => theme.typography.fontWeightBold}
      >
        Add User
      </Typography>
      <Paper
        sx={({ breakpoints }) => ({
          p: 2,
          [breakpoints.up("sm")]: {
            p: 6,
          },
        })}
      >
        <Form />
      </Paper>
    </Box>
  );
}

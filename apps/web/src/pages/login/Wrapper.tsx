import * as React from "react";

import { Paper, Stack } from "@mui/material";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <Paper
        sx={({ breakpoints, spacing }) => ({
          width: "90%",
          maxWidth: "24rem",
          p: 2,
          borderRadius: spacing(2),
          [breakpoints.up("md")]: { p: 3 },
        })}
      >
        {children}
      </Paper>
    </Stack>
  );
}

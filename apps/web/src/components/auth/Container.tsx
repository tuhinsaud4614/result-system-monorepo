import * as React from "react";

import { Box, Paper } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={({ breakpoints }) => ({
          width: "90%",
          maxWidth: "24rem",
          p: 2,
          [breakpoints.up("md")]: { p: 3 },
        })}
      >
        {children}
      </Paper>
    </Box>
  );
}

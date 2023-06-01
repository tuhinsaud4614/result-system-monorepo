import * as React from "react";

import { Box, Typography } from "@mui/material";

interface Props {
  fullName?: string;
  children?: React.ReactNode;
}

export default function Header({ fullName, children }: Props) {
  return (
    <Box
      sx={({ breakpoints }) => ({
        maxWidth: breakpoints.values.md,
        mx: "auto",
      })}
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight="700"
        mb={2}
        sx={({ breakpoints }) => ({
          [breakpoints.up("md")]: { fontSize: "2.25rem" },
        })}
        color="primary"
      >
        {fullName && `Edit ${fullName}`}
      </Typography>
      {children}
    </Box>
  );
}

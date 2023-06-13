import * as React from "react";

import { Stack, Typography } from "@mui/material";

interface Props {
  text: string;
  children?: React.ReactNode;
}

export default function Title({ text, children }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb="1rem"
      sx={{ userSelect: "none" }}
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight="700"
        sx={({ breakpoints }) => ({
          [breakpoints.up("md")]: { fontSize: "2.25rem" },
        })}
        color="primary"
      >
        {text}
      </Typography>
      {children}
    </Stack>
  );
}

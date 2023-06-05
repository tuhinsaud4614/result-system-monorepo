import * as React from "react";

import { Paper, Stack, Typography } from "@mui/material";

interface Props {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function NoData({ title, action, icon, subtitle }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: "25rem",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!!icon && (
        <Stack
          alignItems="center"
          justifyContent="center"
          width="5rem"
          height="5rem"
          sx={({ palette }) => ({
            backgroundColor: palette.background.default,
            borderRadius: "9999px",
          })}
        >
          {icon}
        </Stack>
      )}
      <Typography
        component="h2"
        variant="h6"
        fontWeight="600"
        mt="1.5rem"
        align="center"
      >
        {title}
      </Typography>
      {!!subtitle && (
        <Typography
          component="p"
          variant="body2"
          fontWeight="400"
          mt="0.5rem"
          mb={action ? "2rem" : undefined}
          align="center"
        >
          {subtitle}
        </Typography>
      )}
      {action}
    </Paper>
  );
}

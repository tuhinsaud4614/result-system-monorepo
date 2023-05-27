import * as React from "react";

import { Box } from "@mui/material";

import { useAppSelector } from "../../utility/hooks";
import { getLayoutSidebarState } from "./layout.slice";

interface Props {
  children?: React.ReactNode;
}

export default function MainWrapper({ children }: Props) {
  const open = useAppSelector(getLayoutSidebarState);
  return (
    <Box
      component="main"
      sx={({ breakpoints, spacing, transitions }) => ({
        overflowX: "hidden",
        padding: spacing(10, 2, 2),
        [breakpoints.up("sm")]: {
          transition: transitions.create("margin", {
            easing: transitions.easing[open ? "easeOut" : "sharp"],
            duration:
              transitions.duration[open ? "enteringScreen" : "leavingScreen"],
          }),
          flexGrow: 1,
          marginLeft: open ? 0 : spacing(-30),
        },
      })}
    >
      <Box
        sx={({ breakpoints }) => ({
          mx: "auto",
          maxWidth: breakpoints.values.lg,
        })}
      >
        {children}
      </Box>
    </Box>
  );
}

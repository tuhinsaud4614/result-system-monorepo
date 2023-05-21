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
      sx={[
        ({ breakpoints, spacing, transitions }) => ({
          overflowX: "hidden",
          padding: spacing(10, 2, 2),
          [breakpoints.up("sm")]: {
            transition: transitions.create("margin", {
              easing: transitions.easing.sharp,
              duration: transitions.duration.leavingScreen,
            }),
            flexGrow: 1,
            marginLeft: spacing(-30),
            maxWidth: breakpoints.values.lg,
          },
        }),
        open
          ? ({ breakpoints, transitions }) => ({
              [breakpoints.up("sm")]: {
                transition: transitions.create("margin", {
                  easing: transitions.easing.easeOut,
                  duration: transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
              },
            })
          : {},
      ]}
    >
      {children}
    </Box>
  );
}

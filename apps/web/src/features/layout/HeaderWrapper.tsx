import * as React from "react";

import { AppBar } from "@mui/material";

import { useAppSelector } from "../../utility/hooks";
import { getLayoutSidebarState } from "./layout.slice";

interface Props {
  children?: React.ReactNode;
}

export default function HeaderWrapper({ children }: Props) {
  const open = useAppSelector(getLayoutSidebarState);

  return (
    <AppBar
      position="fixed"
      sx={({ transitions, breakpoints, spacing }) => ({
        transition: transitions.create(["margin", "width"], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.leavingScreen,
        }),
        [breakpoints.up("sm")]: open
          ? {
              width: `calc(100% - ${spacing(30)})`,
              marginLeft: spacing(30),
              transition: transitions.create(["margin", "width"], {
                easing: transitions.easing.easeOut,
                duration: transitions.duration.enteringScreen,
              }),
            }
          : undefined,
      })}
    >
      {children}
    </AppBar>
  );
}

import * as React from "react";

import { ChevronLeft } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../utility/hooks";
import { getLayoutSidebarState, layoutActions } from "./layout.slice";

interface Props {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const open = useAppSelector(getLayoutSidebarState);
  const rdxDispatch = useAppDispatch();

  const handleClose = () => {
    rdxDispatch(layoutActions.changeSidebar(false));
  };

  const content = (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={({ spacing, mixins }) => ({
          padding: spacing(0, 1),
          // necessary for content to be below app bar
          ...mixins.toolbar,
        })}
      >
        <Typography variant="h6" component="h1">
          Panel
        </Typography>
        <IconButton aria-label="close drawer" onClick={handleClose}>
          <ChevronLeft />
        </IconButton>
      </Stack>
      <Divider />
      {children}
    </>
  );

  return (
    <Drawer
      sx={({ spacing, breakpoints }) => ({
        width: spacing(30),
        [breakpoints.up("sm")]: {
          flexShrink: 0,
        },
        "& .MuiDrawer-paper": {
          width: spacing(30),
        },
      })}
      anchor="left"
      open={open}
      variant={smUp ? "persistent" : "temporary"}
      onClose={smUp ? undefined : handleClose}
    >
      {content}
    </Drawer>
  );
}

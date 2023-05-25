import * as React from "react";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { NavLink, type To } from "react-router-dom";

import { useAppDispatch } from "../../../utility/hooks";
import { layoutActions } from "../layout.slice";

interface Props {
  item: {
    name: React.ReactNode;
    to: To;
    icon: React.ReactNode;
  };
}

export default function SidebarItem({ item: { name, icon, to } }: Props) {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const rdxDispatch = useAppDispatch();

  const handleClose = () => {
    !smUp && rdxDispatch(layoutActions.changeSidebar(false));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={to}
        onClick={handleClose}
        sx={({ palette }) => ({
          textTransform: "capitalize",
          "&.active": {
            bgcolor: alpha(palette.secondary.main, 0.08),
            color: "secondary.main",
          },
          "&.active .MuiListItemIcon-root": {
            color: "secondary.main",
          },
        })}
        end
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

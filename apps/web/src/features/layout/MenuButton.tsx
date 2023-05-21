import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../utility/hooks";
import { getLayoutSidebarState, layoutActions } from "./layout.slice";

export default function MenuButton() {
  const open = useAppSelector(getLayoutSidebarState);
  const rdxDispatch = useAppDispatch();

  if (open) {
    return null;
  }

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={() => rdxDispatch(layoutActions.changeSidebar(true))}
      edge="start"
    >
      <Menu />
    </IconButton>
  );
}

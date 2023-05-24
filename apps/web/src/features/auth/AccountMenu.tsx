import * as React from "react";

import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

import { useAppSelector } from "../../utility/hooks";
import LogoutMenuItem from "./Logout";
import { getAuthUser } from "./auth.slice";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuId = React.useId();
  const user = useAppSelector(getAuthUser);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatar =
    user &&
    (user.avatar ? (
      <Avatar
        sx={({ spacing }) => ({ width: spacing(4), height: spacing(4) })}
        src={`${import.meta.env.VITE_APP_API}/${user.avatar.url}`}
        alt="avatar"
      />
    ) : (
      <Avatar
        sx={({ palette, spacing }) => ({
          bgcolor: palette.background.paper,
          color: palette.primary.main,
          width: spacing(4),
          height: spacing(4),
        })}
      >
        {user.firstName.charAt(0).toUpperCase()}
        {user.lastName.charAt(0).toUpperCase()}
      </Avatar>
    ));
  return (
    <>
      <IconButton
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {avatar}
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <LogoutMenuItem onClick={handleClose} />
      </Menu>
    </>
  );
}

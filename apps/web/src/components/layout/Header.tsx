import { Link as MuiLink, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

import AccountMenu from "../../features/auth/AccountMenu";
import HeaderWrapper from "../../features/layout/HeaderWrapper";
import MenuButton from "../../features/layout/MenuButton";

export default function Header() {
  return (
    <HeaderWrapper>
      <Toolbar>
        <MenuButton />
        <MuiLink
          component={Link}
          to="/"
          variant="h6"
          sx={({ palette }) => ({
            display: "inline-flex",
            alignItems: "center",
            mr: "auto",
            color: palette.common.white,
            textDecoration: "none",
          })}
        >
          Result System
        </MuiLink>
        <AccountMenu />
      </Toolbar>
    </HeaderWrapper>
  );
}

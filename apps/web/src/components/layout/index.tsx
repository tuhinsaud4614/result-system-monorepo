import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import SidebarItems from "../../features/auth/SidebarItems";
import MainWrapper from "../../features/layout/MainWrapper";
import Sidebar from "../../features/layout/sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <Box
      sx={({ breakpoints }) => ({
        [breakpoints.up("sm")]: {
          display: "flex",
        },
      })}
    >
      <Header />
      <Sidebar>
        <SidebarItems />
      </Sidebar>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </Box>
  );
}

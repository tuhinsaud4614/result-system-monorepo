import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import MainWrapper from "../../features/layout/MainWrapper";
import Sidebar from "../../features/layout/Sidebar";
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
      <Sidebar />
      <MainWrapper>
        layout
        <Outlet />
      </MainWrapper>
    </Box>
  );
}

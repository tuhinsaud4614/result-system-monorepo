import { Box, styled } from "@mui/material";

export const FormGroup = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

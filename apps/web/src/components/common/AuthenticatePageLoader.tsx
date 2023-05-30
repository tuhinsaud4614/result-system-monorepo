import { Box, CircularProgress } from "@mui/material";

export default function AuthenticatePageLoader() {
  return (
    <Box
      sx={({ breakpoints }) => ({
        maxWidth: breakpoints.values.md,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      })}
    >
      <CircularProgress sx={{ height: "6.25rem", width: "6.25rem" }} />
    </Box>
  );
}

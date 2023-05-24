import { CircularProgress, Stack } from "@mui/material";

export default function PagePulse() {
  return (
    <Stack
      position="fixed"
      zIndex={16}
      left={0}
      top={0}
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress sx={{ height: "6.25rem", width: "6.25rem" }} />
    </Stack>
  );
}

import { Button, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const { state } = useLocation();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={({ palette }) => ({
        backgroundColor: palette.background.paper,
        height: "100vh",
      })}
    >
      <Typography
        variant="h1"
        color="secondary.main"
        sx={({ spacing, palette, breakpoints }) => ({
          textAlign: "center",
          margin: `${spacing(4)} 0 ${spacing()} 0`,
          padding: 0,
          textShadow: `0 0 ${spacing(2)} ${palette.primary.main}`,
          [breakpoints.up("md")]: {
            lineHeight: "1.3em",
            fontSize: spacing(18),
          },
        })}
      >
        404
      </Typography>
      <Typography variant="h5" align="center">
        Looks like the page you were looking for is no longer here.
      </Typography>
      <Button
        component={Link}
        to={state?.location || "/"}
        color="success"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Go to Previous
      </Button>
    </Stack>
  );
}

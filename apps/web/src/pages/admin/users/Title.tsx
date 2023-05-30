import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { WEB_PATHS } from "../../../utility/constants";

export default function Title() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb="1rem"
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight="700"
        sx={({ breakpoints }) => ({
          [breakpoints.up("md")]: { fontSize: "2.25rem" },
        })}
      >
        Users
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={WEB_PATHS.admin.addUser}
        startIcon={<Add />}
      >
        New User
      </Button>
    </Stack>
  );
}

import { Add, GroupOutlined } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { WEB_PATHS } from "../../../utility/constants";

export default function NoUser() {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: "25rem",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        width="5rem"
        height="5rem"
        sx={({ palette }) => ({
          backgroundColor: palette.background.default,
          borderRadius: "9999px",
        })}
      >
        <GroupOutlined fontSize="large" color="secondary" />
      </Stack>
      <Typography
        component="h2"
        variant="h6"
        fontWeight="600"
        mt="1.5rem"
        align="center"
      >
        No users registered
      </Typography>
      <Typography
        component="p"
        variant="body2"
        fontWeight="400"
        mt="0.5rem"
        mb="2rem"
        align="center"
      >
        You currently don't have any registered users. Let's initiate the user
        registration process.
      </Typography>
      <Button
        component={Link}
        to={WEB_PATHS.admin.addUser}
        variant="outlined"
        startIcon={<Add />}
      >
        New User
      </Button>
    </Paper>
  );
}

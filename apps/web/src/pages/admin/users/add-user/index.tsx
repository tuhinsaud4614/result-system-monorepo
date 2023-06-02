import { Box, Paper, Typography } from "@mui/material";

import { useCreateUserMutation } from "../../../../app/services/users.api";
import ErrorModal from "../../../../components/common/ErrorModal";
import { CreateUserInput } from "../utils";
import Form from "./Form";

export default function AdminAddUserPage() {
  const [create, { isLoading, reset, error: apiError }] =
    useCreateUserMutation();

  const createUserHandler = async (formData: CreateUserInput) =>
    create(formData).unwrap();

  return (
    <>
      <Box
        sx={({ breakpoints }) => ({
          maxWidth: breakpoints.values.md,
          mx: "auto",
        })}
      >
        <Typography
          component="h1"
          variant="h5"
          fontWeight="700"
          mb={2}
          sx={({ breakpoints }) => ({
            [breakpoints.up("md")]: { fontSize: "2.25rem" },
          })}
          color="primary"
        >
          Add User
        </Typography>
        <Paper
          sx={({ breakpoints }) => ({
            p: 2,
            [breakpoints.up("sm")]: {
              p: 6,
            },
          })}
        >
          <Form action={createUserHandler} isLoading={isLoading} />
        </Paper>
      </Box>
      {apiError && (
        <ErrorModal
          title="Create User Errors"
          errors={apiError}
          onClose={reset}
        />
      )}
    </>
  );
}

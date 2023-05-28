import { Box, Paper, Typography } from "@mui/material";

import { ErrorResponse } from "@result-system/shared/utility";

import { useCreateUserMutation } from "../../../../app/services/users.api";
import ErrorModal from "../../../../components/common/ErrorModal";
import Form from "../form";
import { CreateUserInput } from "../form/utils";

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
          variant="h5"
          component="h3"
          sx={{ mb: 2 }}
          fontWeight={(theme) => theme.typography.fontWeightBold}
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
          errors={apiError as ErrorResponse}
          onClose={reset}
        />
      )}
    </>
  );
}

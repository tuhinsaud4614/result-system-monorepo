import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { LoginInput, loginInputSchema } from "@result-system/shared/utility";

import { useLoginMutation } from "../../app/services/auth.api";
import ErrorModal from "../../components/common/ErrorModal";
import PasswordInput from "../../components/common/PasswordInput";

export default function Login() {
  const usernameId = React.useId();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginInputSchema),
  });

  const [login, { data, isLoading, reset }] = useLoginMutation();

  console.log("data:", data);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      console.log("error:", error);
      resetForm();
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          {...register("username")}
          variant="outlined"
          id={usernameId}
          label="Username"
          placeholder="Enter your username..."
          sx={{ mb: 2 }}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
          fullWidth
          required
        />
        <PasswordInput {...register("password")} />
        <Button
          variant="contained"
          type="submit"
          disabled={!(isDirty && isValid) || isSubmitting || isLoading}
          fullWidth
        >
          {(isSubmitting || isLoading) && (
            <CircularProgress sx={{ mr: 1, ml: -0.5 }} size={24} />
          )}
          Login
        </Button>
      </form>
      <ErrorModal title="Login errors" errors={["hello"]} onClose={reset} />
    </>
  );
}

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { LoginInput, loginInputSchema } from "@result-system/shared/utility";

import { useLoginMutation } from "../../app/services/auth.api";
import PasswordInput from "../../components/auth/PasswordInput";

export default function Login() {
  const usernameId = React.useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginInputSchema),
  });

  const [login, { data }] = useLoginMutation();

  console.log("data:", data);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      console.log("error:", error);
    }
  });

  return (
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
        disabled={!(isDirty && isValid) || isSubmitting}
        fullWidth
      >
        {isSubmitting && (
          <CircularProgress sx={{ mr: 1, ml: -0.5 }} size={24} />
        )}
        Login
      </Button>
    </form>
  );
}

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  ErrorResponse,
  LoginInput,
  loginInputSchema,
} from "@result-system/shared/utility";

import { useLoginMutation } from "../../app/services/auth.api";
import ErrorModal from "../../components/common/ErrorModal";
import PasswordInput from "../../components/common/PasswordInput";
import { useAppDispatch } from "../../utility/hooks";
import { authActions } from "./auth.slice";

export default function Login() {
  const usernameId = React.useId();
  const rdxDispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginInputSchema),
  });

  const [login, { isLoading, reset, error: apiError }] = useLoginMutation();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { data } = await login(formData).unwrap();
      rdxDispatch(authActions.setAuthState(data.accessToken));
      navigate("/");
    } catch (error) {
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
      {apiError && (
        <ErrorModal
          title="Login errors"
          errors={
            (apiError as ErrorResponse).paths || [
              (apiError as ErrorResponse).message,
            ]
          }
          onClose={reset}
        />
      )}
    </>
  );
}

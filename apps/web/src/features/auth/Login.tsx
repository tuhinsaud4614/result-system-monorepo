import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import {
  ErrorResponse,
  LoginInput,
  loginInputSchema,
} from "@result-system/shared/utility";

import { useLoginMutation } from "../../app/services/auth.api";
import ErrorModal from "../../components/common/ErrorModal";
import PasswordInput from "../../components/common/PasswordInput";
import { WEB_KEYS } from "../../utility/constants";
import { useAppDispatch } from "../../utility/hooks";
import { authActions } from "./auth.slice";

export default function Login() {
  const usernameId = React.useId();
  const rdxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [, setPersist] = useLocalStorage(WEB_KEYS.persist, false);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: { password: "", username: "" },
    resolver: yupResolver(loginInputSchema),
    mode: "onChange",
  });

  const [login, { isLoading, reset, error: apiError }] = useLoginMutation();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { data } = await login(formData).unwrap();
      rdxDispatch(authActions.setAuthState(data.accessToken));
      setPersist(true);
      navigate(location.state?.from?.pathname || "/", { replace: true });
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
          error={!!errors.username?.message}
          helperText={errors.username?.message}
          fullWidth
        />
        <PasswordInput
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!(isDirty && isValid) || isSubmitting || isLoading}
          startIcon={
            (isSubmitting || isLoading) && <CircularProgress size={24} />
          }
          fullWidth
        >
          Login
        </Button>
      </form>
      {apiError && (
        <ErrorModal
          title="Login Errors"
          errors={apiError as ErrorResponse}
          onClose={reset}
        />
      )}
    </>
  );
}

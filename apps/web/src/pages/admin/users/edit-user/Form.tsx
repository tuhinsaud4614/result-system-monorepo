import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useController, useForm } from "react-hook-form";

import { LeanUserWithAvatar } from "@result-system/shared/utility";

import PasswordInput from "../../../../components/common/PasswordInput";
import { FormGroup } from "../../../../components/common/Styled";
import ImagePicker from "../../../../components/common/image-picker";
import { UpdateUserInput, updateUserSchema } from "../utils";

interface Props {
  user: LeanUserWithAvatar;
}

export default function Form({ user }: Props) {
  const firstNameId = React.useId();
  const lastNameId = React.useId();
  // const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset: resetForm,
    watch,
    trigger,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<UpdateUserInput>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      confirmPassword: "",
      password: "",
      avatar: null,
    },
    resolver: yupResolver(updateUserSchema),
    mode: "onChange",
  });

  const avatarCtrl = useController({
    control,
    name: "avatar",
  });

  const handleClipboard: React.ClipboardEventHandler<HTMLInputElement> = (e) =>
    e.preventDefault();

  const onSubmit = handleSubmit(async (_formData) => {
    try {
      //   await action(formData);
      // navigate(WEB_PATHS.admin.users, { replace: true });
    } catch (error) {
      resetForm();
    }
  });

  const passwordWatch = watch("password");
  React.useEffect(() => {
    trigger("confirmPassword");
  }, [passwordWatch, trigger]);

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <TextField
          {...register("firstName")}
          variant="outlined"
          id={firstNameId}
          label="First Name"
          placeholder="Enter user first name."
          sx={{ mb: 2 }}
          error={!!errors.firstName?.message}
          helperText={errors.firstName?.message}
          fullWidth
        />
        <TextField
          {...register("lastName")}
          variant="outlined"
          id={lastNameId}
          label="Last Name"
          placeholder="Enter user last name."
          sx={{ mb: 2 }}
          error={!!errors.lastName?.message}
          helperText={errors.lastName?.message}
          fullWidth
        />
      </FormGroup>
      <FormGroup>
        <PasswordInput
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          onCopy={handleClipboard}
          onPaste={handleClipboard}
        />
        <PasswordInput
          {...register("confirmPassword")}
          label="Confirm Password"
          placeholder="Confirm the password."
          error={!!errors.confirmPassword?.message}
          helperText={errors.confirmPassword?.message}
          onPaste={handleClipboard}
        />
      </FormGroup>
      <ImagePicker
        {...avatarCtrl.field}
        prevImage={
          user.avatar && `${import.meta.env.VITE_APP_API}/${user.avatar.url}`
        }
        label="Avatar"
        value={avatarCtrl.field.value}
        error={!!errors.avatar}
        helperText={errors.avatar?.message}
      />
      <Button
        variant="contained"
        type="submit"
        size="large"
        sx={{ mt: 2 }}
        // disabled={!(isDirty && isValid) || isSubmitting || isLoading}
        disabled={!(isDirty && isValid) || isSubmitting}
        startIcon={
          //   (isSubmitting || isLoading) && <CircularProgress size={24} />
          isSubmitting && <CircularProgress size={24} />
        }
        fullWidth
      >
        Edit
      </Button>
    </form>
  );
}

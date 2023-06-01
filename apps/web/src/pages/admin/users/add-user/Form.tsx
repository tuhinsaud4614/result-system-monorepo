import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useController, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PasswordInput from "../../../../components/common/PasswordInput";
import { FormGroup } from "../../../../components/common/Styled";
import ImagePicker from "../../../../components/common/image-picker";
import { WEB_PATHS } from "../../../../utility/constants";
import { CreateUserInput, createUserSchema } from "../utils";

interface Props {
  action(formData: CreateUserInput): Promise<string>;
  isLoading?: boolean;
}

export default function Form({ action, isLoading }: Props) {
  const firstNameId = React.useId();
  const lastNameId = React.useId();
  const roleId = React.useId();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<CreateUserInput>({
    defaultValues: {
      firstName: "",
      confirmPassword: "",
      lastName: "",
      password: "",
      role: "STUDENT",
      avatar: null,
    },
    resolver: yupResolver(createUserSchema),
    mode: "onChange",
  });

  const avatarCtrl = useController({
    control,
    name: "avatar",
  });

  const handleClipboard: React.ClipboardEventHandler<HTMLInputElement> = (e) =>
    e.preventDefault();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await action(formData);
      navigate(WEB_PATHS.admin.users, { replace: true });
    } catch (error) {
      resetForm();
    }
  });

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
          required
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
          required
        />
      </FormGroup>
      <FormControl sx={{ mb: 2 }} fullWidth>
        <InputLabel id={roleId}>Role</InputLabel>
        <Select
          {...register("role")}
          labelId={roleId}
          id={roleId}
          label="Role"
          placeholder="Enter user role. (Student/Teacher)"
          defaultValue="STUDENT"
          required
        >
          <MenuItem value="STUDENT">Student</MenuItem>
          <MenuItem value="TEACHER">Teacher</MenuItem>
        </Select>
        {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
      </FormControl>
      <FormGroup>
        <PasswordInput
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          onCopy={handleClipboard}
          onPaste={handleClipboard}
          required
        />
        <PasswordInput
          {...register("confirmPassword")}
          label="Confirm Password"
          placeholder="Confirm the password."
          error={!!errors.confirmPassword?.message}
          helperText={errors.confirmPassword?.message}
          onPaste={handleClipboard}
          required
        />
      </FormGroup>
      <ImagePicker
        {...avatarCtrl.field}
        prevImage={null}
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
        disabled={!(isDirty && isValid) || isSubmitting || isLoading}
        startIcon={
          (isSubmitting || isLoading) && <CircularProgress size={24} />
        }
        fullWidth
      >
        Add
      </Button>
    </form>
  );
}

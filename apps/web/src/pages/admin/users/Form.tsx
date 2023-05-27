import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import _ from "lodash";
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";

import {
  IMAGE_MIMES,
  RegisterInput,
  generateNotImageErrorMessage,
  generateTooLargeFileErrorMessage,
  maxFileSize,
  registerInputSchema,
} from "@result-system/shared/utility";

import PasswordInput from "../../../components/common/PasswordInput";
import ImagePicker from "../../../components/common/image-picker";

interface Props {
  oldData?: Omit<RegisterInput, "confirmPassword" | "password"> & {
    avatar?: string;
  };
}

const schema = registerInputSchema.shape({
  avatar: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage("Avatar", `${5} Mb`),
      (value) => {
        if (!value) return true;
        return value.size <= maxFileSize(5);
      },
    )
    .test("fileFormat", generateNotImageErrorMessage("Avatar"), (value) => {
      if (!value) return true;
      return _.has(IMAGE_MIMES, value.type);
    }),
});

const FormGroup = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

export default function Form({ oldData }: Props) {
  const firstNameId = React.useId();
  const lastNameId = React.useId();
  const roleId = React.useId();

  const {
    register,
    control,
    // handleSubmit,
    // reset: resetForm,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      firstName: oldData?.firstName || "",
      confirmPassword: "",
      lastName: oldData?.lastName || "",
      password: "",
      role: oldData?.role || "STUDENT",
      avatar: null,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const avatarCtrl = useController({
    control,
    name: "avatar",
  });

  const handleClipboard: React.ClipboardEventHandler<HTMLInputElement> = (e) =>
    e.preventDefault();

  return (
    <form>
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
      {!oldData && (
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id={roleId}>Role</InputLabel>
          <Select
            {...register("role")}
            labelId={roleId}
            id={roleId}
            label="Role"
            placeholder="Enter user role. (Student/Teacher)"
            defaultValue="STUDENT"
          >
            <MenuItem value="STUDENT">Student</MenuItem>
            <MenuItem value="TEACHER">Teacher</MenuItem>
          </Select>
          {errors.role && (
            <FormHelperText>{errors.role.message}</FormHelperText>
          )}
        </FormControl>
      )}
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
        prevImage={oldData?.avatar}
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
        fullWidth
      >
        {/* {(isSubmitting || isLoading) && (
          <CircularProgress sx={{ mr: 1, ml: -0.5 }} size={24} />
        )} */}
        {oldData ? "Edit" : "Add"}
      </Button>
    </form>
  );
}

import * as React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  CreateClassInput,
  createClassInputSchema,
} from "@result-system/shared/utility";

import { useCreateClassMutation } from "../../../app/services/classes.api";
import ErrorModal from "../../../components/common/ErrorModal";

export default function AddForm() {
  const nameId = React.useId();
  const [createClass, { isLoading, reset, error: apiError }] =
    useCreateClassMutation();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<CreateClassInput>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(createClassInputSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await createClass(formData).unwrap();
      resetForm();
    } catch (error) {
      return;
    }
  });

  return (
    <>
      <Paper
        component="form"
        onSubmit={onSubmit}
        sx={(theme) => ({
          mb: 2,
          px: 2,
          py: 1.5,
          display: "flex",
          gap: theme.spacing(2),
          maxWidth: "520px",
        })}
      >
        <TextField
          {...register("name")}
          variant="outlined"
          id={nameId}
          label="Name"
          placeholder="Enter class name."
          sx={{ flexGrow: 1 }}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          fullWidth
          required
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
          disabled={!(isDirty && isValid) || isSubmitting || isLoading}
          startIcon={
            (isSubmitting || isLoading) && <CircularProgress size={24} />
          }
        >
          Add
        </Button>
      </Paper>
      {apiError && (
        <ErrorModal
          title="Create Class Errors"
          errors={apiError}
          onClose={reset}
        />
      )}
    </>
  );
}

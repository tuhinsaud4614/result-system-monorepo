import * as React from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { type UseFormRegisterReturn } from "react-hook-form";

interface Props<T extends string> extends UseFormRegisterReturn<T> {
  error?: boolean;
  helperText?: React.ReactNode;
  label?: string;
  placeholder?: string;
  onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
}

function Root<T extends string>(
  {
    helperText,
    label = "Password",
    placeholder = "Enter the password.",
    ...rest
  }: Props<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const passwordId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // It ensures that the focus input does not change if it is already focused.
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{ mb: 2 }}
      variant="outlined"
      error={rest.error}
      fullWidth
      required
    >
      <InputLabel htmlFor={passwordId}>{label}</InputLabel>
      <OutlinedInput
        {...rest}
        ref={ref}
        id={passwordId}
        type={showPassword ? "text" : "password"}
        label={label}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color="primary"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

const PasswordInput = React.forwardRef(Root);
export default PasswordInput;

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

function Root<T extends string>(
  {
    helperText,
    ...rest
  }: UseFormRegisterReturn<T> & {
    error?: boolean;
    helperText?: React.ReactNode;
  },
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
      <InputLabel htmlFor={passwordId}>Password</InputLabel>
      <OutlinedInput
        {...rest}
        ref={ref}
        id={passwordId}
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Enter the password..."
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
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

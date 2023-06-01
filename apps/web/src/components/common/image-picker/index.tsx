import * as React from "react";

import { Box, FormHelperText, InputLabel, Paper, Stack } from "@mui/material";

import OldPicture from "./OldPicker";
import PickerButton from "./PickerButton";

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  onChange: (f: File | null) => void;
  value?: File | null;
  helperText?: React.ReactNode;
  error?: boolean;
  label?: string;
  prevImage: string | null;
}

const ImagePicker = React.forwardRef(
  (
    {
      label,
      prevImage = null,
      value,
      helperText,
      onChange,
      error = false,
      ...rest
    }: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const imageId = React.useId();
    const [img, setImg] = React.useState<null | string>(null);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files && event.currentTarget.files.length === 1) {
        const file = event.currentTarget.files[0];
        onChange(file);
      }
    };

    React.useEffect(() => {
      if (value) {
        const objectUrl = URL.createObjectURL(value);
        setImg(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setImg(null);
      }
    }, [value, error]);

    return (
      <Box
        sx={({ spacing }) => ({
          display: "flex",
          flexWrap: "wrap",
          padding: spacing(0.5),
        })}
      >
        {prevImage && <OldPicture src={prevImage} label={label} />}
        <Stack>
          {(label || prevImage) && (
            <InputLabel
              style={{ paddingBottom: "8px" }}
              required={rest.required}
              htmlFor={img ? undefined : imageId}
            >
              {prevImage && "New "}
              {label}
            </InputLabel>
          )}
          <Paper
            sx={({ breakpoints, spacing }) => ({
              overflow: "hidden",
              width: spacing(10),
              height: spacing(7),
              [breakpoints.up("sm")]: {
                width: spacing(13),
                height: spacing(10),
              },
            })}
          >
            {img ? (
              <Box
                component="img"
                sx={{
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                }}
                src={img}
                alt={value?.name || "Picked"}
                height="70"
                width="50"
                title={value?.name || "Picked"}
                onClick={() => onChange(null)}
              />
            ) : (
              <>
                <Box
                  {...rest}
                  component="input"
                  id={imageId}
                  type="file"
                  accept="image/*"
                  onChange={changeHandler}
                  display="none"
                  ref={ref}
                />
                <label htmlFor={imageId}>
                  <PickerButton />
                </label>
              </>
            )}
          </Paper>
          {helperText && (
            <FormHelperText id={imageId} error={error}>
              {helperText}
            </FormHelperText>
          )}
        </Stack>
      </Box>
    );
  },
);

export default ImagePicker;

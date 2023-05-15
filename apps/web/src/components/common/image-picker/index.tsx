import * as React from "react";

import { Close, PhotoCamera } from "@mui/icons-material";
import { Box, Button, FormHelperText, InputLabel, alpha } from "@mui/material";

import OldPicture from "./OldPicker";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChanged: (f: File | null) => void;
  data: File | null;
  helperText?: React.ReactNode;
  error?: boolean;
  margin?: boolean;
  label?: string;
  prevImage?: string;
}

const ImagePicker = ({
  label,
  prevImage,
  data,
  helperText,
  onChanged,
  margin = false,
  error = false,
  id,
  ...rest
}: Props) => {
  const [img, setImg] = React.useState<null | string>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length === 1) {
      const file = event.currentTarget.files[0];
      onChanged(file);
    }
  };

  React.useEffect(() => {
    if (data) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        if (result) {
          setImg(result.toString());
        }
      };
      fileReader.readAsDataURL(data);
    } else {
      setImg(null);
    }
  }, [data, error]);

  // Prev Image

  // File Input
  let content = (
    <>
      <Box
        component="input"
        id={id || "image-picker"}
        type="file"
        accept="image/*"
        onChange={changeHandler}
        display="none"
        {...rest}
      />
      <label htmlFor={id || "image-picker"}>
        <Button
          sx={({ spacing, breakpoints }) => ({
            width: spacing(10),
            height: spacing(7),
            [breakpoints.up("sm")]: {
              width: spacing(13),
              height: spacing(10),
            },
          })}
          variant="outlined"
          color="secondary"
          aria-label="image picker"
          component="span"
        >
          <PhotoCamera fontSize="large" />
        </Button>
      </label>
    </>
  );

  // After Picking Image Input
  if (img) {
    content = (
      <Box
        sx={({ spacing, breakpoints, palette }) => ({
          width: spacing(10),
          height: spacing(7),
          [breakpoints.up("sm")]: {
            width: spacing(13),
            height: spacing(10),
          },
          position: "relative",
          overflow: "hidden",
          borderRadius: spacing(),
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            background: alpha(palette.common.black, 0.3),
          },
        })}
      >
        <Box
          component="img"
          sx={{
            objectFit: "cover",
            height: "inherit",
            width: "inherit",
          }}
          src={img}
          alt="Picked"
          height="70"
          width="50"
          title="Picked"
        />
        <Close
          sx={({ spacing, palette }) => ({
            position: "absolute",
            zIndex: 2,
            top: spacing(0.5),
            right: spacing(0.5),
            cursor: "pointer",
            color: palette.secondary.main,
            fontSize: spacing(3),
            "&:hover": {
              color: palette.secondary.dark,
            },
          })}
          onClick={() => onChanged(null)}
        />
      </Box>
    );
  }

  return (
    <Box
      mt={margin ? 2 : 0}
      mb={margin ? 1 : 0}
      sx={({ spacing }) => ({
        display: "flex",
        flexWrap: "wrap",
        borderRadius: spacing(),
        objectFit: "cover",
        border: "1px solid secondary.dark",
        padding: spacing(0.5),
      })}
    >
      {prevImage && <OldPicture src={prevImage} label={label} />}
      <div>
        {(label || prevImage) && (
          <InputLabel style={{ paddingBottom: "8px" }} required={rest.required}>
            {prevImage && "New "}
            {label}
          </InputLabel>
        )}
        {content}
        {helperText && (
          <FormHelperText
            id={id || "image-picker"}
            variant="filled"
            error={error}
          >
            {helperText}
          </FormHelperText>
        )}
      </div>
    </Box>
  );
};

export default ImagePicker;

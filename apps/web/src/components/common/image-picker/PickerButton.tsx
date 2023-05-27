import { AddPhotoAlternate } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function PickerButton() {
  return (
    <Button
      sx={{
        width: "100%",
        height: "100%",
      }}
      color="primary"
      aria-label="image picker"
      component="span"
    >
      <AddPhotoAlternate fontSize="large" />
    </Button>
  );
}

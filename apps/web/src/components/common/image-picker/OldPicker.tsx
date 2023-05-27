import { Box, InputLabel } from "@mui/material";

export default function OldPicture({
  src,
  label,
}: {
  src: string;
  label?: string;
}) {
  return (
    <Box mr={2}>
      <InputLabel sx={{ pb: 1 }}>Previous {label}</InputLabel>
      <Box
        component="img"
        sx={({ spacing, breakpoints, palette }) => ({
          width: spacing(10),
          height: spacing(7),
          [breakpoints.up("sm")]: {
            width: spacing(13),
            height: spacing(10),
          },
          borderRadius: spacing(),
          objectFit: "cover",
          border: `1px solid ${palette.primary.main}`,
          padding: spacing(0.5),
        })}
        height="70"
        width="50"
        src={src}
        alt="Old Image"
      />
    </Box>
  );
}

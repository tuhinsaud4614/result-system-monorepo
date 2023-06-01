import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useFormattedError } from "../../utility/hooks";

interface Props {
  title: string;
  closeBtnLabel?: string;
  errors?: unknown;
  onClose?(): void;
  onRetry?(): void;
}

export default function ErrorBox({
  errors,
  onClose,
  onRetry,
  title,
  closeBtnLabel = "Clear errors",
}: Props) {
  const newErrors = useFormattedError(errors);

  return (
    <Paper
      variant="outlined"
      sx={({ palette }) => ({
        borderColor: palette.error.main,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Typography
        variant="h6"
        component="h2"
        color="error"
        px={2}
        py={1.25}
        sx={({ palette }) => ({
          borderBottom: `0.5px solid ${palette.error.main}`,
        })}
      >
        {title}
      </Typography>
      {newErrors && (
        <List dense>
          {newErrors.map((er) => (
            <ListItem key={er}>
              <ListItemText
                primary={er}
                primaryTypographyProps={{ color: "warning.main" }}
              />
            </ListItem>
          ))}
        </List>
      )}
      {(onClose || onRetry) && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          px={2}
          gap={1.5}
          py={1.5}
          sx={({ palette }) => ({
            borderTop: `0.5px solid ${palette.error.main}`,
          })}
        >
          {onRetry && (
            <Button
              variant="outlined"
              color="info"
              aria-label="Retry"
              onClick={onRetry}
            >
              Try again
            </Button>
          )}
          {onClose && (
            <Button
              variant="outlined"
              color="warning"
              aria-label={closeBtnLabel}
              onClick={onClose}
            >
              {closeBtnLabel}
            </Button>
          )}
        </Stack>
      )}
    </Paper>
  );
}

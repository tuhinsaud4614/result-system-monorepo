import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ErrorResponse, isObjectWithKeys } from "@result-system/shared/utility";

interface Props {
  title: string;
  errors?: unknown;
  onClose?(): void;
  onRetry?(): void;
}

export default function ErrorBox({ errors, onClose, onRetry, title }: Props) {
  const newErrors =
    !!errors &&
    (isObjectWithKeys<ErrorResponse>(errors, [
      "code",
      "message",
      "success",
      "timeStamp",
    ])
      ? errors.paths || [errors.message]
      : ["Something went wrong"]);

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
              aria-label="Clear errors"
              onClick={onClose}
            >
              Clear errors
            </Button>
          )}
        </Stack>
      )}
    </Paper>
  );
}

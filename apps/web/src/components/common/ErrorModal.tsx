import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  errors?: string | string[];
  onClose(): void;
}

const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "24rem",
  outline: 0,
  pt: 1.5,
};

export default function ErrorModal({ errors, onClose, title }: Props) {
  const content = errors && (
    <List dense>
      {(Array.isArray(errors) ? errors : [errors]).map((er) => (
        <ListItem key={er}>
          <ListItemText
            primary={er}
            primaryTypographyProps={{ color: "warning.main" }}
          />
        </ListItem>
      ))}
    </List>
  );
  return (
    <Modal
      open={!!errors}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { cursor: "pointer" },
        },
      }}
    >
      <Paper sx={style}>
        <Typography variant="h6" component="h2" color="error" px={2}>
          {title}
        </Typography>
        {content}
      </Paper>
    </Modal>
  );
}

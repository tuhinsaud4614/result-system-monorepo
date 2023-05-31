import * as React from "react";

import { DeleteOutline } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import ErrorModal from "./ErrorModal";

interface Props {
  errorTitle: string;
  onClose(): void;
  onDelete(): void;
  reset(): void;
  isLoading: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  open: boolean;
  error?: unknown;
}

export default function DeleteBox({
  errorTitle,
  onClose,
  onDelete,
  isLoading,
  reset,
  error,
  open,
  subTitle,
  title,
}: Props) {
  const id = React.useId();
  return (
    <>
      <Dialog open={open} onClose={onClose} aria-describedby={id}>
        {!!title && <DialogTitle color="error">{title}</DialogTitle>}
        {!!subTitle && (
          <DialogContent>
            <DialogContentText
              id={id}
              color={(theme) => theme.palette.warning.main}
            >
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            aria-label="Cancel"
            onClick={onClose}
            variant="outlined"
            color="success"
            disabled={isLoading}
          >
            Disagree
          </Button>
          <Button
            aria-label="Delete"
            color="error"
            variant="contained"
            onClick={onDelete}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <DeleteOutline />
              )
            }
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {error && (
        <ErrorModal title={errorTitle} errors={error} onClose={reset} />
      )}
    </>
  );
}

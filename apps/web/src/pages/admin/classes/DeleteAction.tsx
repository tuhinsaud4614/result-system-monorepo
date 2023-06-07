import * as React from "react";

import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { IDParams } from "@result-system/shared/utility";

import { useDeleteClassMutation } from "../../../app/services/classes.api";
import DeleteBox from "../../../components/common/DeleteBox";

interface Props {
  id: IDParams["id"];
}

export default function DeleteAction({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const [deleteUser, { isLoading, reset, error }] = useDeleteClassMutation();

  const handleClose = () => {
    if (!isLoading) {
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteUser(id)
      .unwrap()
      .finally(() => setOpen(false));
  };

  return (
    <>
      <IconButton color="error" disabled={isLoading} onClick={handleOpen}>
        <DeleteOutline />
      </IconButton>
      <DeleteBox
        errorTitle="Class Deletion Errors"
        isLoading={isLoading}
        onClose={handleClose}
        onDelete={handleDelete}
        open={open}
        reset={reset}
        error={error}
        subTitle="This action cannot be undone."
        title="Are you want to delete this class?"
      />
    </>
  );
}

import * as React from "react";

import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { LeanUserWithAvatar } from "@result-system/shared/utility";

import { useDeleteUserMutation } from "../../../app/services/users.api";
import DeleteBox from "../../../components/common/DeleteBox";

interface Props {
  id: LeanUserWithAvatar["id"];
}

export default function DeleteAction({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const [deleteUser, { isLoading, reset, error }] = useDeleteUserMutation();

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
        errorTitle="User Deletion Errors"
        isLoading={isLoading}
        onClose={handleClose}
        onDelete={handleDelete}
        open={open}
        reset={reset}
        error={error}
        subTitle="This action cannot be undone."
        title="Are you want to delete this user?"
      />
    </>
  );
}

import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";

import { LeanUserWithAvatar } from "@result-system/shared/utility";

interface Props {
  id: LeanUserWithAvatar["id"];
  fetching: boolean;
}

export default function DeleteAction({ id, fetching }: Props) {
  return (
    <IconButton color="error" disabled={fetching} onClick={() => alert(id)}>
      {fetching ? <CircularProgress size={24} /> : <DeleteOutline />}
    </IconButton>
  );
}

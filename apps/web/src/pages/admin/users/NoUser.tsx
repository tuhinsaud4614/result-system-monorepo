import { Add, GroupOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import NoData from "../../../components/common/NoData";
import { WEB_PATHS } from "../../../utility/constants";

export default function NoUser() {
  return (
    <NoData
      title="No users registered"
      subtitle="You currently don't have any registered users. Let's initiate the user
    registration process."
      icon={<GroupOutlined fontSize="large" color="secondary" />}
      action={
        <Button
          component={Link}
          to={WEB_PATHS.admin.addUser}
          variant="outlined"
          startIcon={<Add />}
        >
          New User
        </Button>
      }
    />
  );
}

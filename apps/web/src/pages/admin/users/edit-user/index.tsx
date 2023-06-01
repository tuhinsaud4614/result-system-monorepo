import * as React from "react";

import { Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { IDParams } from "@result-system/shared/utility";

import { useLazyGetUserQuery } from "../../../../app/services/users.api";
import AuthenticatePageLoader from "../../../../components/common/AuthenticatePageLoader";
import ErrorBox from "../../../../components/common/ErrorBox";
import { WEB_PATHS } from "../../../../utility/constants";
import Form from "./Form";
import Header from "./Header";

export default function AdminEditUserPage() {
  const { id } = useParams<{ id: IDParams["id"] }>();
  const navigate = useNavigate();
  const [getUser, { data, isLoading, error }] = useLazyGetUserQuery();

  React.useEffect(() => {
    if (id) {
      (() => {
        getUser(id);
      })();
    }
  }, [getUser, id]);

  let content = null;

  if (isLoading) {
    content = <AuthenticatePageLoader />;
  } else if (error) {
    content = (
      <ErrorBox
        title="User Fetch Errors"
        errors={error}
        closeBtnLabel="Go Back"
        onClose={() => navigate(WEB_PATHS.admin.users, { replace: true })}
      />
    );
  } else if (data) {
    content = (
      <Paper
        sx={({ breakpoints }) => ({
          p: 2,
          [breakpoints.up("sm")]: {
            p: 6,
          },
        })}
      >
        <Form user={data.data} />
      </Paper>
    );
  }

  return (
    <Header
      fullName={data?.data && `${data.data.firstName} ${data.data.lastName}`}
    >
      {content}
    </Header>
  );
}

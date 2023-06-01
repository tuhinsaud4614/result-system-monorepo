import * as React from "react";

import { Box, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { IDParams } from "@result-system/shared/utility";

import { useLazyGetUserQuery } from "../../../../app/services/users.api";
import AuthenticatePageLoader from "../../../../components/common/AuthenticatePageLoader";
import ErrorBox from "../../../../components/common/ErrorBox";
import { WEB_PATHS } from "../../../../utility/constants";
import Form from "./Form";

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
    <Box
      sx={({ breakpoints }) => ({
        maxWidth: breakpoints.values.md,
        mx: "auto",
      })}
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight="700"
        mb={2}
        sx={({ breakpoints }) => ({
          [breakpoints.up("md")]: { fontSize: "2.25rem" },
        })}
        color="primary"
      >
        Edit{" "}
        {data?.data ? `${data.data.firstName} ${data.data.lastName}` : "User"}
      </Typography>
      {content}
    </Box>
  );
}

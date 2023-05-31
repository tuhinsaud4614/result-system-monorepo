import * as React from "react";

import { Edit } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
  LeanPicture,
  LeanUserWithAvatar,
  isObjectWithKeys,
} from "@result-system/shared/utility";

import { useGetUsersQuery } from "../../../app/services/users.api";
import AuthenticatePageLoader from "../../../components/common/AuthenticatePageLoader";
import ErrorBox from "../../../components/common/ErrorBox";
import THead from "../../../components/common/table/THead";
import { WEB_PATHS } from "../../../utility/constants";
import { HeadCell } from "../../../utility/types";
import DeleteAction from "./DeleteAction";
import NoUser from "./NoUser";
import Title from "./Title";

const cells: HeadCell<keyof LeanUserWithAvatar>[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "username",
    label: "Username",
  },
  {
    id: "role",
    label: "Role",
  },
  {
    id: "avatar",
    label: "Avatar",
  },
  {
    id: "createdAt",
    label: "Created At",
  },
  {
    id: "updatedAt",
    label: "Updated At",
  },
];

export default function AdminUsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {
    data: users,
    error: fetchError,
    refetch,
    isLoading,
    isFetching,
  } = useGetUsersQuery(
    { limit: rowsPerPage, page: page + 1 },
    {
      // pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let content = null;

  if (isLoading) {
    content = <AuthenticatePageLoader />;
  } else if (fetchError) {
    content = (
      <ErrorBox
        title="Users Fetching Errors"
        errors={fetchError}
        onRetry={refetch}
      />
    );
  } else if (!users || users.data.total === 0) {
    content = <NoUser />;
  }

  return (
    <>
      <Title />
      {content || (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <THead cells={cells}>
                <TableCell
                  align="left"
                  sx={({ palette }) => ({
                    backgroundColor: palette.primary.main,
                    color: palette.common.white,
                  })}
                >
                  Actions
                </TableCell>
              </THead>
              <TableBody>
                {users?.data.data.map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      {cells.map((cell) => {
                        const item = row[cell.id];

                        let content;
                        if (cell.id === "id") {
                          content =
                            !isFetching && page * rowsPerPage + index + 1;
                        } else if (
                          isObjectWithKeys<LeanPicture>(item, [
                            "height",
                            "height",
                            "width",
                          ])
                        ) {
                          content = (
                            <Avatar
                              variant="rounded"
                              src={`${import.meta.env.VITE_APP_API}/${
                                item.url
                              }`}
                              alt={row["firstName"]}
                            />
                          );
                        } else if (
                          cell.id === "createdAt" ||
                          cell.id === "updatedAt"
                        ) {
                          content = new Date(
                            item as string,
                          ).toLocaleDateString();
                        } else {
                          content = item as React.ReactNode;
                        }

                        return (
                          <TableCell key={cell.id} align="left">
                            {content}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <DeleteAction id={row.id} />
                        <IconButton
                          color="warning"
                          component={Link}
                          to={WEB_PATHS.admin.edit.dynamic(row.id)}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {!!users?.data.total && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={users.data.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
    </>
  );
}

import * as React from "react";

import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
  ErrorResponse,
  LeanPicture,
  LeanUserWithAvatar,
  isObjectWithKeys,
} from "@result-system/shared/utility";

import { useGetUsersQuery } from "../../../app/services/users.api";
import ErrorModal from "../../../components/common/ErrorModal";
import { WEB_PATHS } from "../../../utility/constants";
import { HeadCell } from "../../../utility/types";

type Keys = keyof LeanUserWithAvatar;

const cells: HeadCell<Keys>[] = [
  {
    id: "id",
    disablePadding: true,
    label: "ID",
  },
  {
    id: "firstName",
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    disablePadding: true,
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
    data,
    error: fetchError,
    refetch,
    isLoading,
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

  if (isLoading) {
    return <CircularProgress sx={{ height: "6.25rem", width: "6.25rem" }} />;
  }

  return (
    <>
      <Box>
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          component={Link}
          to={WEB_PATHS.admin.addUser}
        >
          Add User
        </Button>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {cells.map((cell) => (
                    <TableCell
                      key={cell.id}
                      align="left"
                      sx={({ palette }) => ({
                        backgroundColor: palette.primary.main,
                        color: palette.common.white,
                      })}
                    >
                      {cell.label}
                    </TableCell>
                  ))}
                  <TableCell
                    align="left"
                    sx={({ palette }) => ({
                      backgroundColor: palette.primary.main,
                      color: palette.common.white,
                    })}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.data
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={row.id}>
                        {cells.map((cell) => {
                          const item = row[cell.id];

                          let content;
                          if (cell.id === "id") {
                            content = page * rowsPerPage + index + 1;
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
                            content = item as string;
                          }

                          return (
                            <TableCell key={cell.id} align="left">
                              {content}
                            </TableCell>
                          );
                        })}
                        <TableCell
                          align="left"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconButton
                            color="error"
                            onClick={() => alert(row.id)}
                          >
                            <DeleteOutline />
                          </IconButton>
                          <IconButton color="warning">
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {!!data?.data.total && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={data.data.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
      {fetchError && (
        <ErrorModal
          title="Users Fetching Errors"
          errors={fetchError as ErrorResponse}
          onClose={refetch}
        />
      )}
    </>
  );
}

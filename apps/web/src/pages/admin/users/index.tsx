import * as React from "react";

import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
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

import { WEB_PATHS } from "../../../utility/constants";
import { HeadCell } from "../../../utility/types";

type Keys =
  | "id"
  | "firstName"
  | "lastName"
  | "username"
  | "role"
  | "avatar"
  | "createdAt"
  | "updatedAt";

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

const rows: { [Key in Keys]: string | null }[] = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "Admin",
    username: "A-2000",
    role: "Admin",
    avatar: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AdminUsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                  <TableCell key={cell.id} align="left">
                    {cell.label}
                  </TableCell>
                ))}
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      {cells.map((cell) => {
                        let value: React.ReactNode = row[cell.id];
                        if (cell.id === "id") {
                          value = index + 1;
                        } else if (cell.id === "avatar") {
                          value = (
                            <Avatar
                              variant="rounded"
                              src="/favicon.ico"
                              alt="icon"
                            />
                          );
                        }
                        return (
                          <TableCell key={cell.id} align="left">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        align="left"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton color="error" onClick={() => alert(row.id)}>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

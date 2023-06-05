import * as React from "react";

import { Edit, GroupsOutlined } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ClassRoom } from "@prisma/client";
import { Link } from "react-router-dom";

import { useGetClassesQuery } from "../../../app/services/classes.api";
import AuthenticatePageLoader from "../../../components/common/AuthenticatePageLoader";
import ErrorBox from "../../../components/common/ErrorBox";
import NoData from "../../../components/common/NoData";
import THead from "../../../components/common/table/THead";
import { WEB_PATHS } from "../../../utility/constants";
import { HeadCell } from "../../../utility/types";

const cells: HeadCell<keyof ClassRoom>[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
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

export default function AdminClassesPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {
    data: classes,
    error: fetchError,
    refetch,
    isLoading,
    isFetching,
  } = useGetClassesQuery(
    { limit: rowsPerPage, page: page + 1 },
    {
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
        title="Classes Fetching Errors"
        errors={fetchError}
        onRetry={refetch}
      />
    );
  } else if (!classes || classes.data.total === 0) {
    content = (
      <NoData
        title="No classes added"
        subtitle="You don't have any classes added yet. Would you like to add a class now?"
        icon={<GroupsOutlined fontSize="large" color="secondary" />}
      />
    );
  }

  return (
    content || (
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
              {classes?.data.data.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    {cells.map((cell) => {
                      const item = row[cell.id];

                      let content;
                      if (cell.id === "id") {
                        content = !isFetching && page * rowsPerPage + index + 1;
                      } else if (
                        cell.id === "createdAt" ||
                        cell.id === "updatedAt"
                      ) {
                        content = new Date(item as string).toLocaleDateString();
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
                      {/* <DeleteAction id={row.id} /> */}
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
        {!!classes?.data.total && (
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={classes.data.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    )
  );
}

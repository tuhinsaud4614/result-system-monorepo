import * as React from "react";

import { TableCell, TableHead, TableRow } from "@mui/material";

import { HeadCell } from "../../../utility/types";

interface Props<T extends string> {
  cells: HeadCell<T>[];
  children?: React.ReactNode;
}
export default function THead<T extends string>({ cells, children }: Props<T>) {
  return (
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
        {children}
      </TableRow>
    </TableHead>
  );
}

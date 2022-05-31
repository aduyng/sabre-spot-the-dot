import React from "react";
import { shape, oneOfType, arrayOf, node } from "prop-types";
import MuiTableCell from "@material-ui/core/TableCell";
import TableCellValue from "./TableCellValue";

export default function TableCell({ column, row, children, ...rest }) {
  let align = (column && column.align) || rest.align;
  if (!align && column && (column.type === "integer" || column.type === "float")) {
    align = "right";
  }
  return (
    <MuiTableCell {...rest} align={align}>
      {children || <TableCellValue column={column} row={row} />}
    </MuiTableCell>
  );
}

TableCell.propTypes = {
  column: shape({}),
  row: shape({}),
  children: oneOfType([arrayOf(node), node])
};

TableCell.defaultProps = { column: undefined, row: undefined, children: undefined };

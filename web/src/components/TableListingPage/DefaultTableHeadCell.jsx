import React from "react";
import { string, shape, number } from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import TableHeadCell from "./TableHeadCell";

export default function DefaultTableHeadCell({
  column: { id, align, label, tooltip, style = {}, colSpan, rowSpan }
}) {
  const inner = (
    <TableHeadCell key={id} align={align} style={style} rowSpan={rowSpan} colSpan={colSpan}>
      {label}
    </TableHeadCell>
  );

  if (tooltip) {
    return (
      <Tooltip key={id} title={tooltip} arrow placement="top">
        {inner}
      </Tooltip>
    );
  }

  return inner;
}

DefaultTableHeadCell.propTypes = {
  column: shape({
    id: string.isRequired,
    label: string.isRequired,
    align: string,
    tooltip: string,
    style: shape({}),
    colSpan: number,
    rowSpan: number
  }).isRequired
};

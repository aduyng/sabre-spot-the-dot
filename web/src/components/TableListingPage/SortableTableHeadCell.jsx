import React from "react";
import { string, shape, func } from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import TableHeadCell from "./TableHeadCell";
import TableHeadSortLabel from "./TableHeadSortLabel";

export default function SortableTableHeadCell({
  column: { id, align, label, tooltip, style = {}, rowSpan = 1, colSpan = 1 },
  order,
  orderBy,
  onClick
}) {
  const inner = (
    <TableHeadCell
      key={id}
      sortDirection={orderBy === id && order}
      align={align}
      style={style}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      <TableHeadSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : "asc"}
        onClick={onClick}
      >
        {label}
      </TableHeadSortLabel>
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

SortableTableHeadCell.propTypes = {
  column: shape({
    id: string.isRequired,
    label: string.isRequired,
    align: string,
    tooltip: string,
    style: shape({})
  }).isRequired,
  order: string,
  orderBy: string,
  onClick: func.isRequired
};

SortableTableHeadCell.defaultProps = {
  orderBy: undefined,
  order: undefined
};

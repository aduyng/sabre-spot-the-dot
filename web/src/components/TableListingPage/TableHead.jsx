import React from "react";
import { string, func, arrayOf, shape, bool, number } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MDTableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { TableCell } from "@material-ui/core";
import TableHeadCell from "./TableHeadCell";
import DefaultTableHeadCell from "./DefaultTableHeadCell";
import SortableTableHeadCell from "./SortableTableHeadCell";

const useStyles = makeStyles(theme => ({
  toggle: {
    width: theme.spacing(4),
    padding: 0
  },
  sumRow: {
    backgroundColor: theme.palette.primary.light
  }
}));

export default function TableHead({
  orderBy,
  order,
  onSortChange,
  onSelectAll,
  rowCountTotal,
  rowCountSelected,
  columns,
  includeActions,
  includeSumRow,
  isToggle
}) {
  const classes = useStyles();
  const createSortHandler = property => () => {
    const isAsc = orderBy === property && order === "asc";
    return onSortChange({ order: isAsc ? "desc" : "asc", orderBy: property });
  };

  return (
    <MDTableHead>
      <TableRow>
        {isToggle && (
          <TableHeadCell key="actions" className={classes.toggle}>
            &nbsp;
          </TableHeadCell>
        )}
        {onSelectAll && (
          <TableHeadCell padding="checkbox">
            <Checkbox
              indeterminate={rowCountSelected > 0 && rowCountSelected < rowCountTotal}
              checked={rowCountTotal > 0 && rowCountSelected === rowCountTotal}
              onChange={onSelectAll}
            />
          </TableHeadCell>
        )}
        {includeActions && <TableHeadCell key="actions">&nbsp;</TableHeadCell>}
        {columns.map(column => {
          if (column.sortable) {
            return (
              <SortableTableHeadCell
                key={column.id}
                onClick={createSortHandler(column.id)}
                column={column}
                orderBy={orderBy}
                order={order}
              />
            );
          }

          return <DefaultTableHeadCell key={column.id} column={column} />;
        })}
      </TableRow>
      {includeSumRow && (
        <TableRow className={classes.sumRow}>
          {includeActions && <TableCell />}
          {onSelectAll && <TableCell />}
          {columns.map(column => {
            if (column.sum) {
              return (
                <TableCell align={column.align} key={`${column.id}-sum`}>
                  {`Total: ${column.sum}`}
                </TableCell>
              );
            }
            return <TableCell key={`${column.id}-sum`} />;
          })}
        </TableRow>
      )}
    </MDTableHead>
  );
}

TableHead.propTypes = {
  columns: arrayOf(
    shape({
      id: string.isRequired,
      label: string.isRequired,
      align: string
    })
  ).isRequired,
  order: string,
  orderBy: string,
  onSortChange: func,
  onSelectAll: func,
  rowCountTotal: number,
  rowCountSelected: number,
  includeActions: bool,
  includeSumRow: bool,
  isToggle: bool
};

TableHead.defaultProps = {
  isToggle: false,
  includeActions: false,
  includeSumRow: false,
  onSortChange: undefined,
  orderBy: undefined,
  order: undefined,
  onSelectAll: undefined,
  rowCountTotal: undefined,
  rowCountSelected: undefined
};

import React from "react";
import { arrayOf, shape, func, string, number, bool } from "prop-types";
import MDTableBody from "@material-ui/core/TableBody";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import get from "lodash/get";
import noop from "lodash/noop";
import { useTranslation } from "react-i18next";
import TableRow from "./TableRow";
import TableCell from "./TableHeadCell";
import PageLoader from "../PageLoader";

export default function TableBody({
  rows,
  rowRenderer,
  keyField,
  numberOfColumns,
  loading,
  emptyMessage,
  getRowClassName,
  rowProps,
  onClick
}) {
  const { t } = useTranslation();
  return (
    <MDTableBody onClick={onClick}>
      {loading && (
        <TableRow key="loader">
          <TableCell colSpan={numberOfColumns}>
            <PageLoader />
          </TableCell>
        </TableRow>
      )}
      {!loading && isEmpty(rows) && (
        <TableRow key="noTesults">
          <TableCell colSpan={numberOfColumns} data-testid="noItemFoundNotification">
            {emptyMessage || t("No items found or the list is empty.")}
          </TableCell>
        </TableRow>
      )}
      {!loading &&
        !isEmpty(rows) &&
        map(rows, (row, index) => {
          return (
            <TableRow
              hover
              tabIndex={-1}
              key={get(row, keyField)}
              className={getRowClassName({ row })}
              {...rowProps}
            >
              {rowRenderer({ row, index })}
            </TableRow>
          );
        })}
    </MDTableBody>
  );
}

TableBody.propTypes = {
  onClick: func,
  rows: arrayOf(shape({})).isRequired,
  rowRenderer: func.isRequired,
  keyField: string,
  numberOfColumns: number.isRequired,
  emptyMessage: string,
  loading: bool,
  getRowClassName: func,
  rowProps: shape({ "data-testid": string })
};

TableBody.defaultProps = {
  keyField: "id",
  emptyMessage: null,
  loading: false,
  getRowClassName: noop,
  rowProps: undefined,
  onClick: undefined
};

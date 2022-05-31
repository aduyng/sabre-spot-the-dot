import React from "react";
import get from "lodash/get";
import { shape } from "prop-types";
import NumberFormatter from "../Table/Formatters/NumberFormatter";
import DateFormatter from "../Table/Formatters/DateFormatter";
import BooleanFormatter from "../Table/Formatters/BooleanFormatter";

export default function TableCellValue({ column, row }) {
  const value = get(row, column.id);
  const options = column.formatOptions || {};

  if (column.format === "number") {
    return <NumberFormatter value={value} {...options} />;
  }
  if (column.format === "currency") {
    return <NumberFormatter value={value} {...options} format="$0,0.00" />;
  }
  if (column.format === "percentage") {
    return <NumberFormatter value={value / 100} {...options} format="0.00%" />;
  }
  if (column.format === "date") {
    return <DateFormatter value={value} {...options} />;
  }
  if (column.type === "boolean") {
    return <BooleanFormatter value={value} {...options} />;
  }
  return value || null;
}

TableCellValue.propTypes = {
  column: shape({}).isRequired,
  row: shape({}).isRequired
};

TableCellValue.defaultProps = {};

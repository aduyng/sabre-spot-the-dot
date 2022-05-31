const fmt = require("date-fns/format");
const isString = require("lodash/isString");

module.exports = function formatDate(dateValue, format = "MM/dd/yyyy") {
  if (!dateValue) {
    return undefined;
  }
  const date = isString(dateValue) ? new Date(dateValue) : dateValue;

  return fmt(date, format);
};

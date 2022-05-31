const get = require("lodash/get");
const numeral = require("numeral");
const formatDate = require("./formatDate");

function convertDateToNumber(date) {
  const value = formatDate(date, "yyyyMMdd");
  return numeral(value).value();
}

module.exports = ({ memo, filterKey, operatorType, filterValue, now = new Date() }) => {
  memo.qb.where(function where() {
    if (operatorType === "withinTheLast") {
      this.where(filterKey, ">=", convertDateToNumber(get(filterValue, "time", now)));
      this.where(filterKey, "<=", convertDateToNumber(now));
    }
    if (operatorType === "withinTheNext") {
      this.where(filterKey, "<=", convertDateToNumber(get(filterValue, "time", now)));
      this.where(filterKey, ">=", convertDateToNumber(now));
    }
    if (operatorType === "moreThanTheLast") {
      this.where(filterKey, "<", convertDateToNumber(get(filterValue, "time", now)));
    }
    if (operatorType === "moreThanTheNext") {
      this.where(filterKey, ">", convertDateToNumber(get(filterValue, "time", now)));
    }
    if (operatorType === "between") {
      this.whereBetween(filterKey, [
        convertDateToNumber(get(filterValue, "start", now)),
        convertDateToNumber(get(filterValue, "end", now))
      ]);
    }
    if (operatorType === "inRange") {
      this.whereBetween(filterKey, [
        convertDateToNumber(get(filterValue, "start", now)),
        convertDateToNumber(get(filterValue, "end", now))
      ]);
    }
  });
  return memo;
};

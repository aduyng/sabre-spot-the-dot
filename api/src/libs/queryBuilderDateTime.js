const get = require("lodash/get");

module.exports = ({ queryBuilder, filterKey, operatorType, filterValue, now = new Date() }) => {
  queryBuilder.where(function where() {
    if (operatorType === "withinTheLast") {
      this.where(filterKey, ">=", get(filterValue, "time", now));
      this.where(filterKey, "<=", now);
    }
    if (operatorType === "withinTheNext") {
      this.where(filterKey, "<=", get(filterValue, "time", now));
      this.where(filterKey, ">=", now);
    }
    if (operatorType === "moreThanTheLast") {
      this.where(filterKey, "<", get(filterValue, "time", now));
    }
    if (operatorType === "moreThanTheNext") {
      this.where(filterKey, ">", get(filterValue, "time", now));
    }
    if (operatorType === "between") {
      this.whereBetween(filterKey, [get(filterValue, "start", now), get(filterValue, "end", now)]);
    }
    if (operatorType === "inRange") {
      this.whereBetween(filterKey, [get(filterValue, "start", now), get(filterValue, "end", now)]);
    }
  });
  return queryBuilder;
};

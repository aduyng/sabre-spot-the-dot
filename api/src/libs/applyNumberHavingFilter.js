const isEmpty = require("lodash/isEmpty");
const toInteger = require("lodash/toInteger");

module.exports = ({ memo, filterKey, operatorType, filterValue }) => {
  memo.qb.having(function having() {
    if (!isEmpty(filterValue.value)) {
      const value = toInteger(filterValue.value);
      switch (operatorType) {
        case "equalTo":
          this.where(filterKey, value);
          break;
        case "notEqualTo":
          this.where(filterKey, "!=", value);
          break;
        case "greaterThan":
          this.where(filterKey, ">", value);
          break;
        case "greaterThanOrEqual":
          this.where(filterKey, ">=", value);
          break;
        case "lessThan":
          this.where(filterKey, "<", value);
          break;
        case "lessThanOrEqual":
          this.where(filterKey, "<=", value);
          break;
        default:
          break;
      }
    }
    if (!isEmpty(filterValue.start) && !isEmpty(filterValue.end)) {
      const start = toInteger(filterValue.start);
      const end = toInteger(filterValue.end);
      switch (operatorType) {
        case "between":
          if (start > end) {
            this.where(filterKey, "<", start);
            this.where(filterKey, ">", end);
          } else {
            this.where(filterKey, ">", start);
            this.where(filterKey, "<", end);
          }
          break;
        case "betweenInclusive":
          if (start > end) {
            this.where(filterKey, "<=", start);
            this.where(filterKey, ">=", end);
          } else {
            this.where(filterKey, ">=", start);
            this.where(filterKey, "<=", end);
          }
          break;
        default:
          break;
      }
    }
  });
  return memo;
};

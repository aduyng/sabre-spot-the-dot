const applyDateTimeFilterToQueryBuilder = require("./applyDateTimeFilterToQueryBuilder");

module.exports = ({ memo, filterKey, operatorType, filterValue, now = new Date() }) => {
  applyDateTimeFilterToQueryBuilder({ qb: memo.qb, filterValue, now, filterKey, operatorType });
  return memo;
};

const isBefore = require("date-fns/isBefore");
const resetTime = require("./resetTime");

module.exports = function isDateBefore(date, dateToCompare) {
  return isBefore(resetTime(date), resetTime(dateToCompare));
};

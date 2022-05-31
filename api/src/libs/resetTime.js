const set = require("date-fns/set");
const { zonedTimeToUtc } = require("date-fns-tz");

module.exports = function resetTime(date) {
  const converted = set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return zonedTimeToUtc(converted);
};

const differenceInDays = require("date-fns/differenceInDays");
const isBefore = require("date-fns/isBefore");

module.exports = ({ birthday, today = Date.now() }) => {
  const multiplier = isBefore(today, birthday) ? -1 : 1;

  const days = Math.abs(differenceInDays(birthday, today));

  let years = Math.floor(days / 365);
  const remaining = days % 365;
  if (remaining / 365 > 0.5) {
    years += 1;
  }

  return years * multiplier;
};

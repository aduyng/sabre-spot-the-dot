const numeral = require("numeral");
const isNumber = require("lodash/isNumber");

module.exports = function formatPercentage(valueInHundredScale, { format = "(0.00)%" } = {}) {
  if (isNumber(valueInHundredScale)) {
    return numeral(valueInHundredScale / 100).format(format);
  }
  return undefined;
};

const numeral = require("numeral");

module.exports = function formatCurrency(currencyValue, { showZero = false } = {}) {
  if (showZero) {
    return numeral(currencyValue).format("($0,0.00)");
  }

  if (currencyValue) {
    return numeral(currencyValue).format("($0,0.00)");
  }
  return undefined;
};

import isNil from "lodash/isNil";
import numeral from "numeral";

export default function formatCurrency(currencyValue, { showZero = false } = {}) {
  if (showZero) {
    if (isNil(currencyValue)) {
      return "0";
    }

    return numeral(currencyValue).format("($0,0.00)");
  }
  if (isNil(currencyValue)) {
    return undefined;
  }

  return numeral(currencyValue).format("($0,0.00)");
}

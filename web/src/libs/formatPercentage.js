import numeral from "numeral";
import isNumber from "lodash/isNumber";

export default function formatPercentage(valueInHundredScale, format = "(0.00)%") {
  if (isNumber(valueInHundredScale)) {
    return numeral(valueInHundredScale / 100).format(format);
  }
  return undefined;
}

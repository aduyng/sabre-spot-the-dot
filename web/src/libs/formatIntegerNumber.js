import numeral from "numeral";
import isNil from "lodash/isNil";

export default function formatIntegerNumber(numberValue, { showZero = true } = {}) {
  if (!isNil(numberValue)) {
    if (numberValue === 0 && !showZero) {
      return undefined;
    }
    return numeral(numberValue).format("0,0");
  }
  return undefined;
}

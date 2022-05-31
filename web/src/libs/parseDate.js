import isEmpty from "lodash/isEmpty";
import parse from "date-fns/parse";
import isString from "lodash/isString";

export default function parseDate(dateValue, fromFormat) {
  if (!dateValue) {
    return undefined;
  }
  if (isEmpty(fromFormat)) {
    if (isString(dateValue) && dateValue.includes("T")) {
      const [year, month, day] = dateValue
        .split("T")
        .shift()
        .split("-");
      return new Date(year, month - 1, day);
    }
    return isString(dateValue) ? new Date(dateValue) : dateValue;
  }
  return parse(dateValue, fromFormat, new Date());
}

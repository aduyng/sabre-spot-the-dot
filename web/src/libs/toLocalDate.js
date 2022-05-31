import isValid from "date-fns/isValid";
import isString from "lodash/isString";

export default function toLocalDate(utcDate) {
  if (!utcDate) {
    return utcDate;
  }
  let date;
  if (isString(utcDate)) {
    date = new Date(utcDate);
  } else {
    date = utcDate;
  }
  if (!isValid(date)) {
    return undefined;
  }
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
}

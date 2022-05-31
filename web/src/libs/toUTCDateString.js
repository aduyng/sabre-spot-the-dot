import isString from "lodash/isString";
import parseISO from "date-fns/parseISO";

export default function toUTCDateString(localDate) {
  if (!localDate) {
    return undefined;
  }
  const date = isString(localDate) ? parseISO(localDate) : localDate;
  if (!date) {
    return undefined;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0))
    .toISOString()
    .split("T")
    .shift();
}

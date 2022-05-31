import format from "date-fns/formatDistanceToNow";
import isString from "lodash/isString";

export default function formatDate(dateValue) {
  if (!dateValue) {
    return undefined;
  }
  const date = isString(dateValue) ? new Date(dateValue) : dateValue;

  return format(date);
}

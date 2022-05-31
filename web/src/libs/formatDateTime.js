import format from "date-fns/format";

export default function formatDateTime(dateValue, formatStr = "MMM dd, yyyy hh:mm aa") {
  if (dateValue) {
    return format(new Date(dateValue), formatStr);
  }
  return undefined;
}

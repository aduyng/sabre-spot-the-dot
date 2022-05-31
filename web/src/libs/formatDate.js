import format from "date-fns/format";
import parseDate from "./parseDate";

export default function formatDate(dateValue, noStringParsing = false) {
  if (!dateValue) {
    return undefined;
  }
  const date = noStringParsing ? new Date(dateValue) : parseDate(dateValue);

  return format(date, "MM/dd/yyyy");
}

import format from "date-fns/format";

export default function formatLongDate(dateValue) {
  if (dateValue) return format(new Date(dateValue), "MMM dd, yyyy");
  return undefined;
}

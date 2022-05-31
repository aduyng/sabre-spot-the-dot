import includes from "lodash/includes";
import toUTCDateString from "./toUTCDateString";

export default function convertDateFilterToUTC({ filter }) {
  if (includes(["inRange", "between"], filter.operatorTypeId)) {
    return {
      ...filter,
      query: {
        ...filter.query,
        start: toUTCDateString(filter.query.start),
        end: toUTCDateString(filter.query.end)
      }
    };
  }

  if (
    includes(
      ["withinTheLast", "withinTheNext", "moreThanTheLast", "moreThanTheNext"],
      filter.operatorTypeId
    )
  ) {
    return {
      ...filter,
      query: {
        ...filter.query,
        time: toUTCDateString(filter.query.time)
      }
    };
  }

  return filter;
}

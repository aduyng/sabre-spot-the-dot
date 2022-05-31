import compact from "lodash/compact";

export default function combineAddress({ address1, address2, city, state, zip }) {
  const part1 = compact([address1, address2]).join(" ");
  const stateAndZip = compact([state, zip]).join(" ");
  return compact([part1, city, stateAndZip]).join(", ");
}

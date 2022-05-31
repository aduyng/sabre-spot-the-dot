import numeral from "numeral";

export default function formatFloatNumber(numberValue) {
  if (numberValue) return numeral(numberValue).format("0,0.00");
  return undefined;
}

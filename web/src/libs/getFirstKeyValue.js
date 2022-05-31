export default function getFirstKeyValue(input) {
  if (!input) {
    return undefined;
  }

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in input) {
    return input[key];
  }

  return undefined;
}

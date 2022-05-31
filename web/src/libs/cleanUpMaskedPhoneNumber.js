export default function cleanUpMaskedPhoneNumber(value) {
  return value.replace(/[^\d]/g, "");
}

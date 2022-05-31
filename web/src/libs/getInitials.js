export default function getInitials({ name }) {
  if (!name) {
    return undefined;
  }

  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    const first = parts.shift();
    const last = parts.pop();
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  }

  const firstName = parts.shift();
  return firstName.charAt(0).toUpperCase();
}

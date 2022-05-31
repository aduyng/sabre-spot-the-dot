const formatLongText = longText => {
  const words = longText.split(" ");
  return words.length < 50 && longText.length < 250
    ? longText
    : `${words.slice(0, 50).join(" ")}...`;
};

export default formatLongText;

const times = require("lodash/times");

module.exports = ({ length, poolCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" }) => {
  return times(length, () => {
    return poolCharacters.charAt(Math.floor(Math.random() * poolCharacters.length));
  }).join("");
};

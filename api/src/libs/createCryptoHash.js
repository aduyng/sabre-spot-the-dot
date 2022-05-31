const crypto = require("crypto");

module.exports = ({ input, algorithm = "sha1" }) => {
  return crypto
    .createHash(algorithm)
    .update(input)
    .digest("hex");
};

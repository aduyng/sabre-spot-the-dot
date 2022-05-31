const getApiKeys = require("../../bs/ApiKey/getApiKeys");

module.exports = (root, args, { user }) => {
  return getApiKeys({ userId: user.id });
};

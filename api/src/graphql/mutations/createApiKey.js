const createApiKey = require("../../bs/ApiKey/createApiKey");

module.exports = (root, { description }, { user }) => {
  return createApiKey({
    description,
    userId: user.id
  });
};

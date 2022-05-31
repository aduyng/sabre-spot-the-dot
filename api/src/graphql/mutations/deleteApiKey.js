const deleteApiKey = require("../../bs/ApiKey/deleteApiKey");

module.exports = (root, { id }, { user }) => {
  return deleteApiKey({ id, userId: user.id });
};

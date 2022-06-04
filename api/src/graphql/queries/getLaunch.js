const getLaunch = require("../../bs/Launch/getLaunch");

module.exports = (root, { id }, { user }) => {
  return getLaunch({ launchId: id, userId: user.id });
};

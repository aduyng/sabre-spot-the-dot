const getScreenshots = require("../../bs/Screenshot/getScreenshots")

module.exports = (root, { launchId }, { user }) => {
  return getScreenshots({ launchId, userId: user.id });
};

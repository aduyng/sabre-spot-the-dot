const createScreenshotFromCI = require("../../bs/Screenshot/createScreenshotFromCI");

module.exports = (root, { screenshotInput }, { user }) => {
  return createScreenshotFromCI({ ...screenshotInput, creator: user });
};

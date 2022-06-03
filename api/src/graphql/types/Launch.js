const getScreenshots = require("../../bs/Screenshot/getScreenshots");

module.exports = {
  screenshots: launch => getScreenshots({ launchId: launch.id })
};

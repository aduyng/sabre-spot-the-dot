const getScreenshots = require("../../bs/Launch/getScreenshots");

module.exports = {
  screenshots: root => getScreenshots({ launchId: root.id })
};

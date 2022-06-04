const getScreenshots = require("../../bs/Screenshot/getScreenshots");
const getAvgPercentDiff = require("../../bs/Launch/getAvgPercentDiff");

module.exports = {
  screenshots: launch => getScreenshots({ launchId: launch.id }),
  avgPercentDiff: launch => getAvgPercentDiff({ launchId: launch.id })
};

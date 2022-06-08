const updateProcessedLaunch = require("../src/bs/Launch/updateProcessedLaunch");

module.exports = ({ functions }) => {
  functions.pubsub.schedule("0 1-23 * * *").onRun(() => {
    return updateProcessedLaunch();
  }); // every hour
};

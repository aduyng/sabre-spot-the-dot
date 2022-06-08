const setGolden = require("../../bs/Launch/setGolden");

module.exports = (root, { launchId, projectId, jobId }, { user }) => {
  return setGolden({ launchId, userId: user.id, projectId, jobId });
};

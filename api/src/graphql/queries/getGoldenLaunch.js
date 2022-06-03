const getGoldenLaunch = require("../../bs/Launch/getGoldenLaunch");

module.exports = async (root, { jobId }, { user }) => {
  return getGoldenLaunch({ jobId, userId: user.id });
};

const getGoldenLaunch = require("../../bs/Launch/getGoldenLaunch");

module.exports = async (root, { id }, { user }) => {
  return getGoldenLaunch({ jobId: id, userId: user.id });
};

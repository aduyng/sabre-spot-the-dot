const getGoldenLaunch = require("../../bs/Launch/getGoldenLaunch");

module.exports = (root, { id }, { user }) => {
  return getGoldenLaunch({ jobId: id, userId: user.id });
};

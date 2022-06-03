const getLaunches = require("../../bs/Launch/getLaunches");

module.exports = async (root, { jobId }, { user }) => {
  return getLaunches({ jobId, userId: user.id });
};

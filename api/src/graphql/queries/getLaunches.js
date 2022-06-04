const getLaunches = require("../../bs/Launch/getLaunches");

module.exports = (root, { jobId }, { user }) => {
  return getLaunches({ jobId, userId: user.id });
};

const getJobs = require("../../bs/Job/getJobs");

module.exports = (root, { projectId }, { user }) => {
  return getJobs({ userId: user.id, projectId });
};

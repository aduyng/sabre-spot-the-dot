const updateResembleConfig = require("../../bs/Job/updateResembleConfig");

module.exports = (root, { projectId, jobId, config }, { user }) => {
  return updateResembleConfig({ config, userId: user.id, projectId, jobId });
};

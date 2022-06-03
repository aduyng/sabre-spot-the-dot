const getJob = require("../../bs/Job/getJob")

module.exports = async (args, { id }, { user }) => {
  return getJob({ jobId: id, userId: user.id });
};

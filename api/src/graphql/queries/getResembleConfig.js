const getResembleConfig = require("../../bs/Job/getResembleConfig");

module.exports = async (root, { jobId }) => {
  return getResembleConfig({ jobId });
};

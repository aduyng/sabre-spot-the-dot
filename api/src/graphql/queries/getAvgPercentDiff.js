const getAvgPercentDiff = require("../../bs/Launch/getAvgPercentDiff");
// const { connectDb } = require("../../knex/knex");

module.exports = (root, { launchId }, { user }) => {
  // const knex = connectDb();
  // const auth = knex("Launch")
  //   .innerJoin("Job", "Launch.jobId", "Job.id")
  //   .innerJoin("UserProjectRole", "Job.projectId", "UserProjectRole.projectId")
  //   .where({ "Launch.id": launchId });
  // if (!auth) {
  //   throw new Error("error");
  // }
  return getAvgPercentDiff({ launchId, userId: user.id });
};

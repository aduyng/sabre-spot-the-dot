const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, launchId }) => {
  const knex = await connectDb();
  // const auth = await knex("UserProjectRole")
  //   .innerJoin("Job", "UserProjectRole.projectId", "Job.projectId")
  //   .innerJoin("Launch", "Job.id", "Launch.jobId")
  //   .where({ "UserProjectRole.userId": userId });
  // if (!auth) {
  //   throw new Error("Not authorized");
  // }
  return knex("Screenshot").where({ launchId });
};

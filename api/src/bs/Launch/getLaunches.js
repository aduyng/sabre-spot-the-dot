const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, jobId }) => {
  const knex = await connectDb();
  return knex("Launch")
    .column("Launch.*")
    .innerJoin("Job", "Job.id", "Launch.jobId")
    .innerJoin("Project", "Project.id", "Job.projectId")
    .innerJoin("UserProjectRole", "Project.id", "UserProjectRole.projectId")
    .where({ "UserProjectRole.userId": userId, "Job.id": jobId });
};

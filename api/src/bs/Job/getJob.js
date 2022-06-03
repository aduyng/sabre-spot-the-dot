const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, jobId }) => {
  const knex = await connectDb();
  const res = await knex("Job")
    .column("Job.*")
    .innerJoin("Project", "Project.id", "Job.projectId")
    .innerJoin("UserProjectRole", "Project.id", "UserProjectRole.projectId")
    .where({ "UserProjectRole.userId": userId, "Job.id": jobId })
    .first();
  return res;
};

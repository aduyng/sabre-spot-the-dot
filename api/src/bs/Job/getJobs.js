const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, projectId }) => {
  const knex = await connectDb();
  return knex("Job")
    .column("Job.*")
    .innerJoin("Project", "Project.id", "Job.projectId")
    .innerJoin("UserProjectRole", "Project.id", "UserProjectRole.projectId")
    .where({ "UserProjectRole.userId": userId, "Project.id": projectId });
};

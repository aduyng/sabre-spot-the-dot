const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, projectId }) => {
  const knex = await connectDb();
  return knex("Project")
    .column("Project.*")
    .innerJoin("UserProjectRole", "Project.id", "UserProjectRole.projectId")
    .where({ "UserProjectRole.userId": userId, "Project.id": projectId })
    .first();
};

const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, projectId }) => {
  const knex = await connectDb();
  const res = await knex("Project")
    .column("Project.*")
    .innerJoin("UserProjectRole", "Project.id", "UserProjectRole.projectId")
    .where({ "UserProjectRole.userId": userId, "Project.id": projectId })
    .first();
  return res;
};

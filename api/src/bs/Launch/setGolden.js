const { connectDb } = require("../../knex/knex");

module.exports = async ({ launchId, projectId, jobId, userId }) => {
  const knex = await connectDb();
  const auth = await knex("UserProjectRole").where({ projectId, userId });
  if (!auth) {
    return 403;
  }
  await knex("Launch")
    .update({ isGolden: false })
    .where({ jobId });
  await knex("Launch")
    .update({ isGolden: true })
    .where({ id: launchId });
  return 200;
};

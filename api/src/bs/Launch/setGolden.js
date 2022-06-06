const { connectDb } = require("../../knex/knex");
const transactionallyExecute = require("../../knex/utils/transactionallyExecute");

module.exports = async ({ launchId, projectId, jobId, userId }) => {
  const knex = await connectDb();
  const auth = await knex("UserProjectRole").where({ projectId, userId });
  if (!auth) {
    return 403;
  }
  return transactionallyExecute(async ({ trx }) => {
    await trx("Launch")
      .update({ isGolden: false })
      .where({ jobId });
    const changed = await trx("Launch")
      .update({ isGolden: true })
      .where({ id: launchId });
    if (changed.length === 0) {
      throw new Error("Setting launch failed");
    }
    return 200;
  });
};

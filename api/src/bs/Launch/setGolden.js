const { connectDb } = require("../../knex/knex");
const transactionallyExecute = require("../../knex/utils/transactionallyExecute");
const hasEditorPermission = require("../Project/hasEditorPermission");

module.exports = async ({ launchId, projectId, jobId, userId }) => {
  const auth = await hasEditorPermission({ projectId, userId });
  if (!auth) {
    throw new Error("Permission denied.");
  }
  const knex = await connectDb();
  const launch = await knex("Launch")
    .where({ "Launch.id": launchId, "Launch.jobId": jobId })
    .whereIn("jobId", builder => {
      builder
        .select("id")
        .from("Job")
        .where({ projectId });
    })
    .first();
  if (!launch) {
    throw new Error("Build not found");
  }

  return transactionallyExecute(async ({ trx }) => {
    await trx("Launch")
      .update({ isGolden: false })
      .where({ jobId });
    const [updated] = await trx("Launch")
      .update({ isGolden: true, updatedAt: Date.now(), updatedByUserId: userId })
      .where({ id: launchId })
      .returning("*");
    return updated;
  });
};

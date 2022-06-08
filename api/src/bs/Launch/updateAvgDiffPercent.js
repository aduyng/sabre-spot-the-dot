const { connectDb } = require("../../knex/knex");

module.exports = async ({ launchId }) => {
  const knex = await connectDb();
  const { avg } = await knex("Screenshot")
    .avg("diffPercentage")
    .where({ launchId })
    .first();
  if (!avg) {
    throw new Error("Invalid launch id.");
  }
  return knex("Launch")
    .update("avgDiffPercent", parseInt(avg, 10))
    .where("id", launchId)
    .returning("avgDiffPercent");
};

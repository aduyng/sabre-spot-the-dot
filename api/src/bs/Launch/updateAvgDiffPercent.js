const { connectDb } = require("../../knex/knex");

// should be called after screenshot is finished processing
module.exports = async ({ launchId }) => {
  const knex = await connectDb();
  const avg = await knex("Screenshot")
    .avg("diffPercentage")
    .where({ launchId });
  if (!avg) {
    throw new Error("Invalid launch id.");
  }
  return knex("Launch")
    .update("avgDiffPercent", avg)
    .where("id", launchId)
    .returning("avgDiffPercent");
};

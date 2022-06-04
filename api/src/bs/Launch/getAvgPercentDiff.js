const { connectDb } = require("../../knex/knex");

module.exports = async ({ launchId }) => {
  const knex = await connectDb();
  const res = await knex("Screenshot")
    .avg("diffPercentage as avgPercentDiff")
    .where({ launchId })
    .first();
  return res.avgPercentDiff;
};

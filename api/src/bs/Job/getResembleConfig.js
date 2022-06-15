const merge = require("lodash/merge");
const { RESEMBLE_OPTIONS } = require("../../consts");
const { connectDb } = require("../../knex/knex");

module.exports = async ({ jobId }) => {
  const knex = await connectDb();
  const config = await knex("Job")
    .where({ id: jobId })
    .select(
      "overlayRed",
      "overlayGreen",
      "overlayBlue",
      "transparency",
      "ignoreMethod",
      "errorMethod"
    )
    .first();
  const merged = merge(RESEMBLE_OPTIONS, {
    ignore: config.ignoreMethod,
    output: {
      errorColor: {
        red: config.overlayRed,
        green: config.overlayGreen,
        blue: config.overlayBlue
      },
      errorType: config.errorMethod,
      transparency: config.transparency / 100
    }
  });
  return merged;
};

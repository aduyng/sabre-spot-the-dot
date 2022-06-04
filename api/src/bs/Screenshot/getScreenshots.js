const { connectDb } = require("../../knex/knex");

module.exports = async ({ launchId }) => {
  const knex = await connectDb();
  return knex("Screenshot").where({ launchId });
};

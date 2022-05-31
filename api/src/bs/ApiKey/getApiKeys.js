const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId }) => {
  const knex = await connectDb();
  return knex("ApiKey")
    .where({ userId })
    .orderBy("expiresAt", "asc");
};

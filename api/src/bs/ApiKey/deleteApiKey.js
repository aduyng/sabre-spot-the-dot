const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, id }) => {
  const knex = await connectDb();

  await knex("ApiKey")
    .where({
      id,
      userId
    })
    .delete();

  return 200;
};

const { v4: uuidV4 } = require("uuid");
const addDays = require("date-fns/addDays");
const createCryptoHash = require("../../libs/createCryptoHash");
const { connectDb } = require("../../knex/knex");

module.exports = async ({ description, userId, now = new Date() }) => {
  const plainTextKey = uuidV4();
  const knex = await connectDb();
  const key = createCryptoHash({ input: plainTextKey });
  const [inserted] = await knex("ApiKey")
    .insert({
      description,
      key,
      userId,
      expiresAt: addDays(now, 60).getTime()
    })
    .returning("*");
  return {
    ...inserted,
    plainTextKey
  };
};

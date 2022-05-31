const isEmpty = require("lodash/isEmpty");
const createContext = require("../bs/Session/createContext");
const logger = require("../libs/logger");
const createCryptoHash = require("../libs/createCryptoHash");
const { connectDb } = require("../knex/knex");

function getToken({ req }) {
  const {
    headers: { authorization }
  } = req;

  if (isEmpty(authorization)) {
    return null;
  }

  return authorization.split(" ").pop();
}

module.exports = async ({ req }) => {
  const token = getToken({ req });
  if (token && token.startsWith("api:")) {
    const key = token.split(":").pop();
    const encryptedApiKey = createCryptoHash({ input: key });
    const knex = await connectDb();
    const apiKey = await knex("ApiKey")
      .where({ key: encryptedApiKey })
      .where("expiresAt", ">", Date.now())
      .first();

    if (!apiKey) {
      logger.info(`api key is not valid`);
      return {};
    }
    const user = await knex("User")
      .where({ id: apiKey.userId })
      .first();
    return { user };
  }
  return createContext({ token, req });
};

const isEmpty = require("lodash/isEmpty");
const { initializeFirebase } = require("../../firebase/initialize");
const logger = require("../../libs/logger");
const { connectDb } = require("../../knex/knex");

module.exports = async ({ token, req }) => {
  const admin = initializeFirebase();
  logger.debug(`token: ${token}`);
  const ctx = { timeZone: req.headers["x-timezone"] };
  if (isEmpty(token)) {
    logger.debug(`no token passed.`);
    return ctx;
  }
  const decodedToken = await admin.auth().verifyIdToken(token);
  logger.debug(`token decoded, uid: ${decodedToken.uid}, name: ${decodedToken.name}`);
  const knex = await connectDb();
  const user = await knex("User")
    .where({ uid: decodedToken.uid })
    .first();
  if (!user) {
    const [createdUser] = await knex("User")
      .insert({
        uid: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
        avatarUrl: decodedToken.picture
      })
      .returning("*");

    return {
      user: createdUser,
      ctx
    };
  }

  return {
    ...ctx,
    user
  };
};

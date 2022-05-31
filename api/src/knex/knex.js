const Knex = require("knex");
const getRuntimeEnv = require("../libs/getRuntimeEnv");
const config = require("./config");
const logger = require("../libs/logger");

let connection;

const connectDb = async () => {
  const env = getRuntimeEnv();
  const cfg = config[env];

  if (!connection) {
    const startTime = Date.now();
    logger.log(`creating new db connection with environment: ${env}`);
    connection = Knex(cfg);

    return connection
      .raw("select 1+1 as result")
      .then(() => {
        logger.log(
          `connected to ${cfg.connection.host}/${cfg.connection.database}, took: ${Date.now() -
            startTime}`
        );
        return connection;
      })
      .catch(err => {
        logger.error(
          `unable to connect to ${cfg.connection.host}/${
            cfg.connection.database
          }: ${err}, took: ${Date.now() - startTime}`
        );
      });
  }
  return connection;
};

const closeDb = async () => {
  if (connection) {
    await connection.destroy();
    connection = null;
  }

  return true;
};

module.exports = { connectDb, closeDb };

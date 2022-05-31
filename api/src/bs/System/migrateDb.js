const logger = require("../../libs/logger");

module.exports = ({ knex, command = "latest" }) => {
  logger.log(`[${__filename}] about to run command ${command}`);
  if (command === "up" || command === "down" || command === "latest" || command === "rollback") {
    return knex.migrate[command]().then(() => {
      logger.log(`[${__filename}] command ${command} completed successfully`);
    });
  }

  return false;
};

const { connectDb } = require("../src/knex/knex");
const migrateDb = require("../src/bs/System/migrateDb");

module.exports = ({ functions }) =>
  functions.pubsub.topic("system-migrate-db").onPublish(message => {
    return connectDb().then(knex => {
      const { command } = message.json;
      return migrateDb({ knex, command });
    });
  });

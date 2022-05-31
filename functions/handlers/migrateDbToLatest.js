const { connectDb } = require("../src/knex/knex");
const migrateDb = require("../src/bs/System/migrateDb");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB"
};

module.exports = ({ functions }) =>
  functions
    .runWith(runtimeOpts)
    .pubsub.schedule("0 0 1 12 *")
    .onRun(() => {
      return connectDb().then(knex => {
        return migrateDb({ knex, command: "latest" });
      });
    });

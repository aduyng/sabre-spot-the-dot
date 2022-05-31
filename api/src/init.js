/* eslint-disable global-require */

const { env = "development" } = require("minimist")(process.argv.slice(2));
const overwriteEnvironmentVariables = require("./libs/overwriteEnvironmentVariables");

function start() {
  const server = require("./graphql/server");
  const logger = require("./libs/logger");
  const { initializeFirebase } = require("./firebase/initialize");
  const { connectDb } = require("./knex/knex");
  initializeFirebase();

  return connectDb()
    .then(() => server.listen(process.env.PORT, process.env.HOST))
    .then(({ url }) => {
      logger.log(`Server ready at ${url}`);
    })
    .catch(err => {
      logger.error(`Unable to start the server: ${err}`, err.stack);
    });
}

overwriteEnvironmentVariables({ env }).then(() => start());

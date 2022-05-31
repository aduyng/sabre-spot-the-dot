const server = require("../src/graphql/server");
const { connectDb } = require("../src/knex/knex");
const logger = require("../src/libs/logger");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB"
};

module.exports = ({ functions }) =>
  functions.runWith(runtimeOpts).https.onRequest((...args) =>
    connectDb()
      .then(() =>
        server.createHandler({
          cors: {
            origin: true,
            credentials: true
          }
        })(...args)
      )
      .catch(error => {
        logger.error(
          `[${__filename}] unable to process the request: ${error}, stack: ${error.stack}`
        );
      })
  );

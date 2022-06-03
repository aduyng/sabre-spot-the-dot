const processImageDiff = require("../src/bs/Screenshot/processImageDiff");
const { connectDb } = require("../src/knex/knex");
const logger = require("../src/libs/logger");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "2GB"
};

module.exports = ({ functions }) =>
  functions
    .runWith(runtimeOpts)
    .storage.object()
    .onFinalize(async ({ bucket, name, contentType }) => {
      console.log(`bucket: ${bucket}, name: ${name}, contentType: ${contentType}`);
      return connectDb()
        .then(() => processImageDiff({ bucket, name, contentType }))
        .catch(error => {
          logger.error(
            `[${__filename}] unable to process the request: ${error}, stack: ${error.stack}`
          );
        });
    });

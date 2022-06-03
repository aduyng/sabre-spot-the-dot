const processImageDiff = require("../src/bs/Screenshot/processImageDiff");
const { connectDb } = require("../src/knex/knex");
const logger = require("../src/libs/logger");
const { UPLOAD_DIR } = require("../src/consts");

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
      if (name.split("/").shift() !== UPLOAD_DIR) {
        console.warn(`the file name doesn't start with "${UPLOAD_DIR}", skip it!`);
        return false;
      }

      return connectDb()
        .then(knex => processImageDiff({ knex, bucket, name, contentType }))
        .catch(error => {
          logger.error(
            `[${__filename}] unable to process the request: ${error}, stack: ${error.stack}`
          );
        });
    });

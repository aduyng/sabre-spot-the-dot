const path = require("path");
const first = require("lodash/first");
const logger = require("../libs/logger");
const { initializeFirebase } = require("./initialize");

module.exports = ({ targetFilePath, content, contentType, expiresInSeconds = 30 }) => {
  logger.debug(`file will be saved at ${targetFilePath}`);
  const storage = initializeFirebase().storage();

  const fileInFirebase = storage.bucket().file(targetFilePath);
  return fileInFirebase
    .save(content, {
      contentType
    })
    .then(() =>
      fileInFirebase.setMetadata({
        contentDisposition: `attachment; filename=${path.basename(targetFilePath)}`
      })
    )
    .then(() => {
      return fileInFirebase
        .getSignedUrl({
          action: "read",
          expires: Date.now() + expiresInSeconds * 1000
        })
        .then(response => {
          return first(response);
        });
    });
};

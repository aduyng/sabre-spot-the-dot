const first = require("lodash/first");
const path = require("path");
const logger = require("./logger");
const getBucket = require("../firebase/getBucket");

module.exports = async ({ jsonData, targetFilePath }) => {
  try {
    const fileInFirebase = getBucket().file(targetFilePath);
    const contents = JSON.stringify(jsonData);
    await fileInFirebase.save(contents);

    fileInFirebase.setMetadata({
      contentDisposition: `attachment; filename=${path.basename(targetFilePath)}`
    });

    return fileInFirebase
      .getSignedUrl({
        action: "read",
        expires: Date.now() + 30 * 1000
      })
      .then(response => {
        logger.debug(`Data has been uploaded to ${targetFilePath}`);
        return first(response);
      });
  } catch (error) {
    logger.error(`failed to upload to ${targetFilePath}: ${error}`);
    return false;
  }
};

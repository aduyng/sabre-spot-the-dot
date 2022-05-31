const Promise = require("bluebird");
const first = require("lodash/first");
const path = require("path");
const fs = require("fs");
const logger = require("./logger");
const getBucket = require("../firebase/getBucket");

module.exports = ({ uploadStream, targetFilePath }) => {
  if (process.env.STD_DONT_UPLOAD_STATEMENTS === "true") {
    return new Promise((resolve, reject) => {
      const destPDF = path.join(process.cwd(), "tmp", path.basename(targetFilePath));
      const writeStream = fs.createWriteStream(destPDF);
      uploadStream
        .pipe(writeStream)
        .on("error", reject)
        .on("finish", () => resolve(destPDF));
    });
  }
  const fileInFirebase = getBucket().file(targetFilePath);
  return new Promise((resolve, reject) => {
    logger.debug(`about to upload to ${targetFilePath}`);
    uploadStream
      .pipe(fileInFirebase.createWriteStream())
      .on("error", reject)
      .on("finish", resolve);
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
          expires: Date.now() + 30 * 1000
        })
        .then(response => {
          logger.debug(`Data has been uploaded to ${targetFilePath}`);
          return first(response);
        });
    })
    .catch(error => {
      logger.error(`failed to upload to ${targetFilePath}: ${error}`);
    });
};

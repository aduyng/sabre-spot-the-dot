const getBucket = require("../../../firebase/getBucket");

module.exports = async function getScreenshotUploadUrl({ filePath }) {
  const options = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream"
  };

  const bucket = getBucket();

  const [url] = await bucket.file(filePath).getSignedUrl(options);
  return url;
};

const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

module.exports = async function getScreenshotUploadUrl({ filePath }) {
  const options = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream"
  };

  const [url] = await storage
    .bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(filePath)
    .getSignedUrl(options);
  return url;
};

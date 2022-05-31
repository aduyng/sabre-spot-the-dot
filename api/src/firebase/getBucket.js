const { Storage } = require("@google-cloud/storage");
const config = require("./config");

let storage;

module.exports = function getBucket() {
  if (!storage) {
    storage = new Storage();
  }
  return storage.bucket(process.env.FIREBASE_STORAGE_BUCKET || config.storageBucket);
};

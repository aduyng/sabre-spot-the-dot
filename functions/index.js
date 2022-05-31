const fs = require("fs");
const path = require("path");
const each = require("lodash/each");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const logger = require("./src/libs/logger");
const isRunningInsideFirebase = require("./src/libs/isRunningInsideFirebase");

const config = functions.config();

each(config, (values, parentKey) => {
  each(values, (value, key) => {
    const envKey = `${parentKey.toUpperCase()}_${key.toUpperCase()}`;
    if (process.env[envKey] === undefined) {
      process.env[envKey] = value;
      // logger.debug(`[${__filename}] set process.env.${envKey}=${process.env[envKey]}`);
    }
  });
});

if (isRunningInsideFirebase() && !process.env.CI) {
  logger.debug(`[${__filename}] firebase admin SDK has been initialized.`);
  admin.initializeApp();
}

const folderPath = path.join(__dirname, "handlers");
const handlerFiles = fs.readdirSync(folderPath);

handlerFiles.forEach(file => {
  const name = file.split(".").shift();

  const absFilePath = path.join(folderPath, name);
  const fn = require(absFilePath); // eslint-disable-line global-require, import/no-dynamic-require

  exports[name] = fn({
    functions,
    admin,
    functionName: name,
    config
  });
  return true;
});

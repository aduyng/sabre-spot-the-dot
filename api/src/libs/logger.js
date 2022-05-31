const isRunningInsideFirebase = require("./isRunningInsideFirebase");

function getLogger() {
  if (isRunningInsideFirebase()) {
    // eslint-disable-next-line import/no-unresolved,global-require
    const functions = require("firebase-functions");

    return functions.logger;
  }

  return console;
}

module.exports = getLogger();

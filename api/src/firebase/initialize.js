const firebase = require("firebase-admin");
const config = require("./config");
const isRunningInsideFirebase = require("../libs/isRunningInsideFirebase");

let initialized = false;

const initializeFirebase = () => {
  if (!initialized) {
    if (!isRunningInsideFirebase()) {
      firebase.initializeApp(config);
    }
    initialized = true;
  }
  return firebase;
};

module.exports = { initializeFirebase };

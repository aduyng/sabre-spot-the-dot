const isEmpty = require("lodash/isEmpty");

module.exports = () => !isEmpty(process.env.FIREBASE_CONFIG);

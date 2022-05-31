const omitBy = require("lodash/omitBy");
const isNil = require("lodash/isNil");

module.exports = function removeNilProperties(input) {
  return omitBy(input, isNil);
};

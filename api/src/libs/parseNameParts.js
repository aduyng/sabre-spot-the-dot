const split = require("lodash/split");
const last = require("lodash/last");
const head = require("lodash/head");
const without = require("lodash/without");
const includes = require("lodash/includes");
const join = require("lodash/join");
const trim = require("lodash/trim");
const isEmpty = require("lodash/isEmpty");

module.exports = name => {
  let splitName;
  const hasComma = includes(name, ",");
  if (hasComma) {
    splitName = split(name, ",");
  } else {
    splitName = split(name, " ");
  }
  if (splitName.length === 1) {
    return { lastName: head(splitName) };
  }
  let firstName = trim(hasComma ? splitName.pop() : splitName.shift());
  const lastName = trim(hasComma ? splitName.shift() : splitName.pop());
  let middleName;

  if (includes(firstName, " ") && last(split(firstName, " ")).length === 1) {
    const parts = split(firstName, " ");
    middleName = parts.pop();
    firstName = join(parts, " ");
  }

  middleName = isEmpty(middleName)
    ? join(without(splitName, firstName, lastName), " ")
    : middleName;
  return {
    firstName,
    middleName: isEmpty(middleName) ? undefined : middleName,
    lastName
  };
};

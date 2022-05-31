const isNumber = require("lodash/isNumber");
const isNaN = require("lodash/isNaN");
const isFunction = require("lodash/isFunction");
const numeral = require("numeral");
const reduce = require("lodash/reduce");

module.exports = function sumValueBy(entries, key) {
  const extractor = isFunction(key) ? entry => key(entry) : entry => entry[key];
  return reduce(
    entries,
    (sum, entry) => {
      const value = extractor(entry);
      if (!isNumber(value) || isNaN(value)) {
        return sum;
      }

      return sum.add(value);
    },
    numeral(0)
  ).value();
};

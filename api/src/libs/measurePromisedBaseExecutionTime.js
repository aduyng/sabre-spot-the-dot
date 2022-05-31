const Promise = require("bluebird");
const BigInt = require("big-integer");
const logger = require("./logger");

const cache = {};
const DIVIDED_BY = 10 ** 9;

function printEndTime(label, startedAt) {
  const endedAt = BigInt(process.hrtime.bigint());
  const currentDiff = endedAt.subtract(startedAt);
  cache[label] = (cache[label] !== undefined ? cache[label] : BigInt(0)).add(currentDiff);
  const formattedCurrentDiff = currentDiff.divide(DIVIDED_BY);
  const formattedTotalDiff = cache[label].divide(DIVIDED_BY);

  logger.info("%s took %ds, total: %ds", label, formattedCurrentDiff, formattedTotalDiff);
}

module.exports = (label, fn) => {
  return (...args) => {
    const startedAt = process.hrtime.bigint();

    return Promise.resolve(fn(...args))
      .then(result => {
        printEndTime(label, startedAt);
        return result;
      })
      .catch(error => {
        printEndTime(label, startedAt);
        throw error;
      });
  };
};

const includes = require("lodash/includes");
const reduce = require("lodash/reduce");
const requireNotInMaintenanceMode = require("./requireNotInMaintenanceMode");

const allowQueries = ["config"];

module.exports = function applyNotInMaintenanceModeMiddleware(queries) {
  return reduce(
    queries,
    (memo, fn, key) => {
      if (includes(allowQueries, key)) {
        memo[key] = fn;
      } else {
        memo[key] = requireNotInMaintenanceMode(fn);
      }
      return memo;
    },
    {}
  );
};

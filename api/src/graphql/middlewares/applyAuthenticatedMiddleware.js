const includes = require("lodash/includes");
const reduce = require("lodash/reduce");
const requireAuthenticated = require("./requireAuthenticated");

const allowUnauthenticatedResolvers = [
  "config",
  "getSession",
  "getAutomationCustomToken",
  "validateEventForKiosk",
  "checkInFromKiosk",
  "executeRawSqlQuery"
];

module.exports = function applyAuthenticatedMiddleware(queries) {
  return reduce(
    queries,
    (memo, fn, key) => {
      if (includes(allowUnauthenticatedResolvers, key)) {
        memo[key] = fn;
      } else {
        memo[key] = requireAuthenticated(fn);
      }
      return memo;
    },
    {}
  );
};

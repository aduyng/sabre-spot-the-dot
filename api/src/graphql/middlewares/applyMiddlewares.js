const reduce = require("lodash/reduce");

module.exports = function applyMiddleware(queries, middlewares) {
  return reduce(middlewares, (keep, middleware) => middleware(keep), queries);
};

const path = require("path");
const importDir = require("./importDir");
const applyAuthenticatedMiddleware = require("./middlewares/applyAuthenticatedMiddleware");
const applyNotInMaintenanceModeMiddleware = require("./middlewares/applyNotInMaintenanceModeMiddleware");
const applyMiddlewares = require("./middlewares/applyMiddlewares");

const Mutation = importDir({ dir: path.resolve(__dirname, "mutations") });
const Query = importDir({ dir: path.resolve(__dirname, "queries") });
const types = importDir({ dir: path.resolve(__dirname, "types") });

const middlewares = [applyAuthenticatedMiddleware, applyNotInMaintenanceModeMiddleware];

module.exports = {
  Query: applyMiddlewares(Query, middlewares),
  Mutation: applyMiddlewares(Mutation, middlewares),
  ...types
};

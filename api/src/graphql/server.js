const { ApolloServer } =
  process.env.NODE_ENV === "development"
    ? require("apollo-server")
    : require("apollo-server-cloud-functions");
const map = require("lodash/map");
const get = require("lodash/get");
const includes = require("lodash/includes");
const { resolvers: scalarResolvers } = require("graphql-scalars");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const context = require("./context");
const logger = require("../libs/logger");

const BASIC_LOGGING = {
  requestDidStart(requestContext) {
    logger.log(
      `${requestContext.request.query}, VARIABLES: ${JSON.stringify(
        requestContext.request.variables,
        null,
        2
      )}`
    );
    return {
      didEncounterErrors(rc) {
        logger.error(
          `an error happened in response to QUERY: ${rc.request.query}, errors: ${JSON.stringify(
            map(rc.errors, error => `${error.toString()}, stack: ${error.stack}`)
          )}`
        );
      }
    };
  },

  willSendResponse(rc) {
    logger.log(`response sent: ${JSON.stringify(rc.response)}`);
  }
};

const plugins = [];
if (process.env.STD_DISABLE_REQUEST_LOGGING !== "true") {
  plugins.push(BASIC_LOGGING);
}

module.exports = new ApolloServer({
  typeDefs,
  resolvers: { ...scalarResolvers, ...resolvers },
  playground: process.env.STD_RUNTIME_ENV === "development",
  introspection: true,
  context,
  plugins,
  debug: process.env.STD_RUNTIME_ENV === "development",
  formatError: err => {
    const errorName =
      get(err, "originalError.__proto__.constructor.name") || get(err, "originalError.name");
    if (
      includes(["DBError", "ForeignKeyViolationError", "DataError", "DatabaseError"], errorName)
    ) {
      logger.error(`${errorName}: ${err}, stack: ${err.stack}`);
      return new Error("Internal server error");
    }
    return err;
  }
});

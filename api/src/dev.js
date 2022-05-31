const server = require("./graphql/server");
const logger = require("./libs/logger");

const { initializeFirebase } = require("./firebase/initialize");
const { connectDb } = require("./knex/knex");

initializeFirebase();
connectDb()
  .then(() => server.listen(process.env.PORT, process.env.HOST))
  .then(({ url }) => {
    logger.log(`[${__filename}] 🚀  Server ready at ${url}`);
  })
  .catch(err => {
    logger.error(`[${__filename}] unable to start the server: ${err}`);
  });

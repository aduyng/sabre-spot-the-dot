const path = require("path");
const isRunningInsideFirebase = require("../libs/isRunningInsideFirebase");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: isRunningInsideFirebase()
        ? `${process.env.DB_SOCKET_PATH || "/cloudsql"}/${
            process.env.POSTGRES_INSTANCE_CONNECTION_NAME
          }`
        : process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    },
    debug: process.env.SQL_DEBUG === "true"
  },
  production: {
    client: "postgresql",
    connection: {
      host: isRunningInsideFirebase()
        ? `${process.env.DB_SOCKET_PATH || "/cloudsql"}/${
            process.env.POSTGRES_INSTANCE_CONNECTION_NAME
          }`
        : process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds")
    }
  }
};

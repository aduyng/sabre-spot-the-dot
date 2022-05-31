const fs = require("fs-extra");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));

const envFilePath = path.resolve(path.dirname(__filename), "../api/.env-cmdrc.local.json");

const input = fs.readJsonSync(envFilePath);

input.development.POSTGRES_DB = argv.databaseName;

fs.writeJsonSync(envFilePath, input, { spaces: 4 });

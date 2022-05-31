const { readJSON } = require("fs-extra");
const path = require("path");
const each = require("lodash/each");
const merge = require("lodash/merge");
const defaults = require("../../.env-cmdrc.json");

module.exports = async ({ env }) => {
  let overrides;
  try {
    overrides = await readJSON(path.join(__dirname, "../../.env-cmdrc.local.json"));
    console.log("found .env-cmdrc.local.json, use both .env-cmdrc.json and .env-cmdrc.local.json");
  } catch (error) {
    console.log("no .env-cmdrc.local.json found, use only .env-cmdrc.json");
  }

  const configs = overrides ? merge(defaults, overrides) : defaults;

  const envConfig = configs[env];
  each(envConfig, (value, key) => {
    process.env[key] = value;
  });
};

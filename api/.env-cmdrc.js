const merge = require("lodash/merge");
const defaults = require("./.env-cmdrc.json");

let overrides;
try {
  // eslint-disable-next-line global-require,import/no-unresolved
  overrides = require("./.env-cmdrc.local.json");
} catch (error) {
  console.warn("./.env-cmdrc.local.json is not found, ignore overrides");
}

module.exports = overrides ? merge(defaults, overrides) : defaults;

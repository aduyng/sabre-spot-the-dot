/* eslint-disable global-require,import/no-dynamic-require */
/*
 */
const { env = "development", script, ...argv } = require("minimist")(process.argv.slice(2));
const fs = require("fs-extra");
const path = require("path");
const first = require("lodash/first");
const overwriteEnvironmentVariables = require("../libs/overwriteEnvironmentVariables");

function requireScript(scriptName) {
  const absPath = path.join(__dirname, `${scriptName}.js`);
  if (!fs.existsSync(absPath)) {
    console.error(`missing script ${absPath}`);
    return undefined;
  }

  try {
    return require(absPath);
  } catch (error) {
    console.error(`failed to require ${absPath}: ${error}`);
    return undefined;
  }
}

function start() {
  let scriptFn;
  if (script) {
    scriptFn = requireScript(script);
  }

  if (first(argv._)) {
    scriptFn = requireScript(first(argv._));
  }
  if (!scriptFn) {
    console.error(`unable to require the CLI script`);
    return -1;
  }

  const { initializeFirebase } = require("../firebase/initialize");
  const { connectDb } = require("../knex/knex");
  initializeFirebase();

  return connectDb().then(knex => scriptFn({ knex, ...argv }));
}

overwriteEnvironmentVariables({ env })
  .then(() => start())
  .then(returnCode => {
    if (returnCode >= 0) {
      console.log(`${script} has been executed successfully.`);
    }
    process.exit(0);
  })
  .catch(error => {
    console.error(`error occurred: ${error}`, error.stack);
    process.exit(1);
  });

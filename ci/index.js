const { script, ...argv } = require("minimist")(process.argv.slice(2));
const fs = require("fs-extra");
const path = require("path");
const first = require("lodash/first");

function requireScript(scriptName) {
  const absPath = path.join(__dirname, "src", `${scriptName}.js`);
  if (!fs.existsSync(absPath)) {
    console.error(`missing script ${absPath}`);
    return undefined;
  }

  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
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

  return scriptFn(argv);
}

Promise.resolve()
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

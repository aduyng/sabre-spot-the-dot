const path = require("path");
const Promise = require("bluebird");
const { replaceStringInFiles } = require("tiny-replace-files");

module.exports = async ({ from: fromKeys, to: toKeys, path: inPath }) => {
  const files = path.join(process.cwd(), inPath);

  console.log(`[${__filename}] files: ${files}`);
  return Promise.each(fromKeys, (from, index) => {
    const to = toKeys[index];
    console.log(`[${__filename}] replacing: "${from}" with "${to}"`);
    const options = {
      files,
      from,
      to
    };
    return replaceStringInFiles(options);
  });
};

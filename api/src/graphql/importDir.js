const fs = require("fs");
const path = require("path");
const reduce = require("lodash/reduce");

module.exports = ({ dir }) => {
  const files = fs.readdirSync(dir);
  return reduce(
    files,
    (memo, file) => {
      const absolutePath = path.resolve(dir, file);
      const stats = fs.statSync(absolutePath);
      if (!stats.isFile()) {
        return memo;
      }
      const name = file.split(".").shift();
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return { ...memo, [name]: require(absolutePath) };
    },
    {}
  );
};

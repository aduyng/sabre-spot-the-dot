const tmp = require("tmp");

module.exports = () =>
  new Promise((resolve, reject) => {
    tmp.dir((error, path, cleanupCallback) => {
      if (error) {
        return reject(error);
      }

      return resolve({
        path,
        cleanupCallback
      });
    });
  });

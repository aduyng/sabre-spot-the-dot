const firebaseConfig = require("../../firebase/config");

module.exports = (root, args, context) => ({
  isDevelopment: process.env.NODE_ENV === "development",
  firebaseConfig,
  company: context.company,
  version: process.env.STD_VERSION,
  buildNumber: process.env.STD_BUILD_NUMBER,
  defaultPaginationRowsPerPage: [25, 50, 75, 100],
});

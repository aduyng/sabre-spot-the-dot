const values = require("lodash/values");

module.exports = o => !values(o).some(x => x !== undefined);

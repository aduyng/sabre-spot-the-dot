const Promise = require("bluebird");
const keys = require("lodash/keys");
const logger = require("./logger");

module.exports = ({ queryBuilder, filters, applyFilter, ...rest }) => {
  logger.log(`applying filters: ${JSON.stringify(filters)}`);

  return Promise.reduce(
    keys(filters),
    (memo, filterKey) => {
      const filter = filters[filterKey];
      logger.log(`applying ${filterKey}: ${JSON.stringify(filter)}`);

      return applyFilter({ ...rest, filterKey, filter, queryBuilder: memo.qb }).then(() => memo);
    },
    { qb: queryBuilder }
  );
};

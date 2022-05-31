const Promise = require("bluebird");
const get = require("lodash/get");
const applyFilters = require("./applyFilters");
const applyBaseOrder = require("./applyOrder");

module.exports = ({
  queryBuilder,
  order,
  orderBy,
  page,
  rowsPerPage,
  filters,
  includeCount = true,
  applyFilter,
  applyOrder,
  ...rest
}) => {
  return applyFilters({ ...rest, queryBuilder, filters, applyFilter }).then(({ qb }) => {
    const matchQuery = includeCount && qb.clone();
    return Promise.resolve(
      applyBaseOrder({ ...rest, orderBy, queryBuilder: qb, order, applyOrder })
    ).then(({ qb: qbWithOrder }) => {
      if (page !== undefined && rowsPerPage !== undefined) {
        qbWithOrder.limit(rowsPerPage);
        qbWithOrder.offset(page * rowsPerPage);
      }
      const promises = [qbWithOrder.execute()];
      if (includeCount) {
        promises.push(matchQuery.count());
      }
      return Promise.all(promises).spread((rows, matchedResult) => {
        if (includeCount) {
          const count = get(matchedResult, "[0].count", 0);
          return {
            count,
            rows
          };
        }
        return rows;
      });
    });
  });
};

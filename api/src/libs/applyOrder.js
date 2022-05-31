const isEmpty = require("lodash/isEmpty");

module.exports = ({ queryBuilder, order, orderBy, applyOrder, ...rest }) => {
  if (isEmpty(orderBy) || isEmpty(order)) {
    return { qb: queryBuilder };
  }
  return Promise.resolve(applyOrder({ ...rest, queryBuilder, orderBy, order })).then(() => ({
    qb: queryBuilder
  }));
};

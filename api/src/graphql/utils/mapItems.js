const map = require("lodash/map");
const uniq = require("lodash/uniq");
const join = require("lodash/join");
const compact = require("lodash/compact");
const size = require("lodash/size");
const isEmpty = require("lodash/isEmpty");
const keyBy = require("lodash/keyBy");
const isRequestingFieldName = require("./isRequestingFieldName");

module.exports = ({
  listQueryResult,
  info,
  requestingFieldName,
  uniqueIdFieldName,
  Model,
  referencedFieldName = "id"
}) => {
  if (!isRequestingFieldName({ info, fieldName: requestingFieldName })) {
    return listQueryResult;
  }
  if (size(listQueryResult.rows) === 0) {
    return listQueryResult;
  }
  const uniqueIds = compact(uniq(map(listQueryResult.rows, uniqueIdFieldName)));
  if (isEmpty(uniqueIds)) {
    return listQueryResult;
  }
  // use .whereRaw to avoid knex limitation of 1000 binding values
  return Model.query()
    .whereRaw(Model.knex().raw(`"${referencedFieldName}" IN (${join(uniqueIds, ",")})`))
    .then(results => {
      const hashed = keyBy(results, referencedFieldName);
      return {
        ...listQueryResult,
        rows: map(listQueryResult.rows, item => ({
          ...item,
          [requestingFieldName]: hashed[item[uniqueIdFieldName]]
        }))
      };
    });
};

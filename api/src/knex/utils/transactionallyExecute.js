const Promise = require("bluebird");
const { connectDb } = require("../knex");

module.exports = function transactionallyExecute(fn) {
  return connectDb()
    .then(connection => connection.transaction())
    .then(trx => {
      return Promise.resolve(fn({ trx }))
        .then(result => {
          return trx.commit().then(() => result);
        })
        .catch(error => {
          return trx.rollback().then(() => {
            throw error;
          });
        });
    });
};

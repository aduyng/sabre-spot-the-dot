const { ForbiddenError } = require("apollo-server");
const isEmpty = require("lodash/isEmpty");
const get = require("lodash/get");

module.exports = next => (root, args, context, info) => {
  const user = get(context, "user");
  if (isEmpty(user)) {
    throw new ForbiddenError();
  }
  return next(root, args, context, info);
};

const { ForbiddenError } = require("apollo-server");
const get = require("lodash/get");

module.exports = next => (root, args, context, info) => {
  const isSystemInMaintenanceMode = get(context, "isSystemInMaintenanceMode");
  if (isSystemInMaintenanceMode) {
    throw new ForbiddenError();
  }
  return next(root, args, context, info);
};

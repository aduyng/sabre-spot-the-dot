const getProjects = require("../../bs/Project/getProjects");

module.exports = (root, args, { user }) => {
  return getProjects({ userId: user.id });
};

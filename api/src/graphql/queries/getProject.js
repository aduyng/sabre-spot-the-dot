const getProject = require("../../bs/Project/getProject");

module.exports = (root, { id }, { user }) => {
  return getProject({ userId: user.id, projectId: id });
};

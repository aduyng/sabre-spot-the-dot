const { ROLE_ID_EDITOR, ROLE_ID_OWNER } = require("../../consts");

const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, projectId }) => {
  const knex = await connectDb();
  const auth = await knex("UserProjectRole")
    .where({ projectId, userId })
    .whereIn("roleId", [ROLE_ID_EDITOR, ROLE_ID_OWNER])
    .first();
  return !!auth;
};

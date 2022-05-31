module.exports = async function fixMaxSequenceValue({ tableName, knex }) {
  const maxId = parseInt(
    (
      await knex(tableName)
        .max("id")
        .first()
    ).max,
    10
  );
  return knex.schema.raw(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${maxId + 1}`);
};

exports.up = async knex => {
  await knex.schema.alterTable("Launch", table => {
    table.integer("avgDiffPercent").unsigned();
  });
};

exports.down = async knex => {
  await knex.schema.alterTable("Launch", table => {
    table.dropColumn("avgDiffPercent");
  });
};

exports.up = async knex => {
  await knex.schema.alterTable("Screenshot", table => {
    table.dropColumn("url", "size", "diffUrl");
    table.string("diff", 1000);
  });
};

exports.down = async knex => {
  await knex.schema.alterTable("Screenshot", table => {
    table.string("url", 1000);
    table.bigInteger("size");
    table.string("diffUrl", 1000);
    table.dropColumn("diff");
  });
};

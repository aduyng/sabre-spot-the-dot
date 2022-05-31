exports.up = async knex => {
  await knex.schema.createTable("Job", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .bigInteger("projectId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Project")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("name", 500).notNullable();
  });

  await knex.schema.createTable("Launch", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .bigInteger("jobId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Job")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.enum("status", ["started", "in-progress", "complete", "errored"]);
    table.bigInteger("startedAt");
    table.bigInteger("completedAt");
    table
      .boolean("isGolden")
      .defaultTo(false)
      .notNullable();
  });

  await knex.schema.createTable("Screenshot", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .bigInteger("launchId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Launch")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("name", 1000).notNullable();
    table.string("url", 1000).notNullable();
    table.bigInteger("size").notNullable();
    table.string("diffUrl", 1000);
    table.integer("diffPercentage").unsigned();
    table.enum("status", ["created", "processing", "complete"]).defaultTo("created");
    table
      .bigInteger("createdAt")
      .unsigned()
      .notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("Screenshot");
  await knex.schema.dropTable("Launch");
  await knex.schema.dropTable("Job");
};

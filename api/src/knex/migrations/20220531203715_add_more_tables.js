const {
  JOB_STATUS_CREATED,
  JOB_STATUS_IN_PROGRESS,
  JOB_STATUS_STOPPED,
  LAUNCH_STATUS_CREATED,
  LAUNCH_STATUS_IN_PROGRESS,
  LAUNCH_STATUS_COMPLETE,
  LAUNCH_STATUS_ERROR,
  LAUNCH_STATUS_TERMINATED,
  SCREENSHOT_STATUS_CREATED,
  SCREENSHOT_STATUS_PROCESSING,
  SCREENSHOT_STATUS_COMPLETE
} = require("../../consts");

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
    table.string("url", 500);
    table
      .enum("status", [JOB_STATUS_CREATED, JOB_STATUS_IN_PROGRESS, JOB_STATUS_STOPPED])
      .defaultTo(JOB_STATUS_CREATED);
    table.bigInteger("createdAt");
    table
      .bigInteger("createdByUserId")
      .unsigned()
      .references("id")
      .inTable("User")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");

    table.bigInteger("updatedAt");
    table
      .bigInteger("updatedByUserId")
      .unsigned()
      .references("id")
      .inTable("User")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    table.unique(["projectId", "name"]);
  });

  await knex.schema.createTable("Launch", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name", 500).notNullable();
    table.string("url", 500);
    table.bigInteger("number").unsigned();
    table.string("commit", 500);
    table.string("branch", 500);
    table
      .bigInteger("jobId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Job")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .boolean("isGolden")
      .defaultTo(false)
      .notNullable();

    table
      .enum("status", [
        LAUNCH_STATUS_CREATED,
        LAUNCH_STATUS_IN_PROGRESS,
        LAUNCH_STATUS_COMPLETE,
        LAUNCH_STATUS_ERROR,
        LAUNCH_STATUS_TERMINATED
      ])
      .defaultTo(LAUNCH_STATUS_CREATED);
    table.bigInteger("createdAt");
    table
      .bigInteger("createdByUserId")
      .unsigned()
      .references("id")
      .inTable("User")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");

    table.bigInteger("updatedAt");
    table
      .bigInteger("updatedByUserId")
      .unsigned()
      .references("id")
      .inTable("User")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    table.unique(["jobId", "name"]);
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
    table.string("url", 1000);
    table.bigInteger("size");
    table.string("diffUrl", 1000);
    table.integer("diffPercentage").unsigned();
    table
      .enum("status", [
        SCREENSHOT_STATUS_CREATED,
        SCREENSHOT_STATUS_PROCESSING,
        SCREENSHOT_STATUS_COMPLETE
      ])
      .defaultTo(SCREENSHOT_STATUS_CREATED);
    table.bigInteger("createdAt");
    table
      .bigInteger("createdByUserId")
      .unsigned()
      .references("id")
      .inTable("User")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");

    table.bigInteger("updatedAt");
    table
      .bigInteger("updatedByUserId")
      .unsigned()
      .references("id")
      .inTable("User")
      .onUpdate("CASCADE")
      .onDelete("SET NULL");
    table.unique(["launchId", "name"]);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("Screenshot");
  await knex.schema.dropTable("Launch");
  await knex.schema.dropTable("Job");
};

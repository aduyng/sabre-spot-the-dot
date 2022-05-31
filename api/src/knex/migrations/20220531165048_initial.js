const fixMaxSequenceValue = require("../utils/fixMaxSequenceValue");

exports.up = async knex => {
  await knex.schema.createTable("User", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .string("uid", 128)
      .notNullable()
      .unique();
    table.string("name", 200).notNullable();
    table.string("email", 200).notNullable();
    table.text("avatarUrl");
  });

  await knex.schema.createTable("Project", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name").notNullable();
  });

  await knex("Project").insert([
    {
      id: 1,
      name: "Digital Experience"
    },
    {
      id: 2,
      name: "Digital Workspace"
    },
    {
      id: 3,
      name: "Digital Experience Check-In"
    }
  ]);

  await fixMaxSequenceValue({ tableName: "Project", knex });

  await knex.schema.createTable("Role", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name").notNullable();
  });

  await knex("Role").insert([
    {
      id: 1,
      name: "Owner"
    },
    {
      id: 2,
      name: "Editor"
    },
    {
      id: 3,
      name: "Viewer"
    }
  ]);

  await fixMaxSequenceValue({ tableName: "Role", knex });

  await knex.schema.createTable("UserProjectRole", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .bigInteger("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("User")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .bigInteger("projectId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Project")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .bigInteger("roleId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Role")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("ApiKey", table => {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .string("key", 200)
      .notNullable()
      .unique();
    table
      .bigInteger("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("User")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("description", 200);
    table.bigInteger("expiresAt").unsigned();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("UserProjectRole");
  await knex.schema.dropTable("Role");
  await knex.schema.dropTable("Project");
  await knex.schema.dropTable("ApiKey");
  await knex.schema.dropTable("User");
};

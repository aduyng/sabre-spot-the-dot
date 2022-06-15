const {
  RESEMBLE_IGNORE_NOTHING,
  RESEMBLE_ERROR_FLATDIFFINTENSE,
  RESEMBLE_IGNORE_METHODS,
  RESEMBLE_ERROR_METHODS
} = require("../../consts");

exports.up = async knex => {
  await knex.schema.alterTable("Job", table => {
    table.enum("ignoreMethod", RESEMBLE_IGNORE_METHODS).defaultTo(RESEMBLE_IGNORE_NOTHING);
    table.enum("errorMethod", RESEMBLE_ERROR_METHODS).defaultTo(RESEMBLE_ERROR_FLATDIFFINTENSE);
    table.integer("transparency").defaultTo(100);
    table.integer("overlayRed").defaultTo(255);
    table.integer("overlayGreen").defaultTo(0);
    table.integer("overlayBlue").defaultTo(255);
  });
};

exports.down = async knex => {
  await knex.schema.alterTable("Job", table => {
    table.dropColumn("ignoreMethod");
    table.dropColumn("errorMethod");
    table.dropColumn("transparency");
    table.dropColumn("overlayRed");
    table.dropColumn("overlayGreen");
    table.dropColumn("overlayBlue");
  });
};

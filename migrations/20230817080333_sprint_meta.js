/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("sprint_meta", (table) => {
    table.string("title").notNullable();
    table.string("project").notNullable();
    table.string("emotion").notNullable();
    table.integer("sprint_id").unsigned().references("id").inTable("sprints");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sprint_meta");
};

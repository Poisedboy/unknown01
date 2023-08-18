/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("sprints", (table) => {
    table.increments("id").primary();
    table.text("content").notNullable();
    table.integer("duration").notNullable();
    table.integer("speed").notNullable();
    table.integer("count_words").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.integer("user_id").unsigned().references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sprints");
};

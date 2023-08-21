/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("google_id").unique();
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("given_name").notNullable();
    table.string("family_name").notNullable();
    table.string("picture").notNullable();
    table.timestamp("date_created").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

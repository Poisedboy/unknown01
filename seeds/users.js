/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("User").del();
  await knex("User").insert([
    { id: 1, email: "emal1@mail.com", name: "Serhii", password: "1234567890" },
    {
      id: 2,
      email: "emal2@outlook.com",
      name: "Alexander",
      password: "qwerty",
    },
    { id: 3, email: "emal3@rambler.com", name: "Dima", password: "abcde" },
  ]);
};

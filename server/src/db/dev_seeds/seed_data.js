/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  // await knex("participants").del();
  // await knex("participants").insert([
  //   { participant_name: "example-participant-foo" },
  //   { participant_name: "example-participant-bar" },
  //   { participant_name: "example-participant-qux" },
  // ]);
  // await knex("integrations").del();
  // await knex("integrations").insert([
  //   { consumer_id: 1, provider_id: 2 },
  //   { consumer_id: 2, provider_id: 3 },
  //   { consumer_id: 3, provider_id: 1 },
  // ]);
}

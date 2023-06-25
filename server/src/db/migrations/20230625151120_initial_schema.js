export function up(knex) {
  return knex.schema
    .createTable("participants", (table) => {
      table.increments("participant_id").primary();
      table.string("participant_name").unique().notNullable();
      table.timestamps(true, true);
    })
    .createTable("integrations", (table) => {
      table.increments("integration_id").primary();
      table
        .integer("consumer_id")
        .unsigned()
        .notNullable()
        .references("participant_id")
        .inTable("participants")
        .onDelete("CASCADE")
        .index();
      table
        .integer("provider_id")
        .unsigned()
        .notNullable()
        .references("participant_id")
        .inTable("participants")
        .onDelete("CASCADE")
        .index();
      table.timestamps(true, true);
      table.unique(["consumer_id", "provider_id"]);
    })
    .createTable("contracts", (table) => {
      table.increments("contract_id").primary();
      table
        .integer("participant_id")
        .unsigned()
        .notNullable()
        .references("participant_id")
        .inTable("participants")
        .onDelete("CASCADE")
        .index();
      table.jsonb("contract").notNullable();
      table.string("contract_type", 20).notNullable();
      table.string("contract_format", 20).notNullable();
      table.string("contract_hash", 40).notNullable();
      table.timestamps(true, true);
      table.unique(["participant_id", "contract_hash"]);
    })

    .createTable("participant_versions", (table) => {
      table.increments("participant_version_id").primary();
      table
        .integer("contract_id")
        .unsigned()
        .notNullable()
        .references("contract_id")
        .inTable("contracts")
        .onDelete("CASCADE")
        .index();
      table
        .integer("participant_id")
        .unsigned()
        .notNullable()
        .references("participant_id")
        .inTable("participants")
        .onDelete("CASCADE")
        .index();
      table.string("participant_branch");
      table.string("participant_version").notNullable();
      table.timestamps(true, true);
    })
    .createTable("comparisons", (table) => {
      table.increments("comparison_id").primary();
      table
        .integer("integration_id")
        .unsigned()
        .notNullable()
        .references("integration_id")
        .inTable("integrations")
        .onDelete("CASCADE")
        .index();
      table
        .integer("consumer_contract_id")
        .unsigned()
        .notNullable()
        .references("contract_id")
        .inTable("contracts")
        .onDelete("CASCADE")
        .index();
      table
        .integer("provider_contract_id")
        .unsigned()
        .notNullable()
        .references("contract_id")
        .inTable("contracts")
        .onDelete("CASCADE")
        .index();
      table.string("comparison_status", 20).notNullable();
      table.timestamps(true, true);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists("comparisons")
    .dropTableIfExists("integrations")
    .dropTableIfExists("participant_versions")
    .dropTableIfExists("contracts")
    .dropTableIfExists("participants");
}

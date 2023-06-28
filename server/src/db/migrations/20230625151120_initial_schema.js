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
    .createTable("consumer_contracts", (table) => {
      table.increments("consumer_contract_id").primary();
      table
        .integer("consumer_id")
        .unsigned()
        .notNullable()
        .references("participant_id")
        .inTable("participants")
        .onDelete("CASCADE")
        .index();
      table.jsonb("contract").notNullable();
      table.string("contract_format", 20).notNullable();
      table.string("contract_hash", 40).notNullable();
      table.timestamps(true, true);
      table.unique(["consumer_id", "contract_hash"]);
    })
    .createTable("provider_specs", (table) => {
      table.increments("provider_spec_id").primary();
      table
        .integer("provider_id")
        .unsigned()
        .notNullable()
        .references("participant_id")
        .inTable("participants")
        .onDelete("CASCADE")
        .index();
      table.jsonb("spec").notNullable();
      table.string("spec_format", 20).notNullable();
      table.string("spec_hash", 40).notNullable();
      table.timestamps(true, true);
      table.unique(["provider_id", "spec_hash"]);
    })
    .createTable("participant_versions", (table) => {
      table.increments("participant_version_id").primary();
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
        .references("consumer_contract_id")
        .inTable("consumer_contracts")
        .onDelete("CASCADE")
        .index();
      table
        .integer("provider_spec_id")
        .unsigned()
        .notNullable()
        .references("provider_spec_id")
        .inTable("provider_specs")
        .onDelete("CASCADE")
        .index();
      table.string("comparison_status", 20).notNullable();
      table.jsonb("result");
      table.timestamps(true, true);
    })
    .createTable("versions_contracts", (table) => {
      table.increments("version_contract_id").primary();
      table
        .integer("consumer_version_id")
        .unsigned()
        .notNullable()
        .references("participant_version_id")
        .inTable("participant_versions")
        .onDelete("CASCADE")
        .index();
      table
        .integer("consumer_contract_id")
        .unsigned()
        .notNullable()
        .references("consumer_contract_id")
        .inTable("consumer_contracts")
        .onDelete("CASCADE")
        .index();
      table.timestamps(true, true);
      table.unique(["consumer_version_id", "consumer_contract_id"]);
    })
    .createTable("versions_specs", (table) => {
      table.increments("version_spec_id").primary();
      table
        .integer("provider_version_id")
        .unsigned()
        .notNullable()
        .references("participant_version_id")
        .inTable("participant_versions")
        .onDelete("CASCADE")
        .index();
      table
        .integer("provider_spec_id")
        .unsigned()
        .notNullable()
        .references("provider_spec_id")
        .inTable("provider_specs")
        .onDelete("CASCADE")
        .index();
      table.timestamps(true, true);
      table.unique(["provider_version_id", "provider_spec_id"]);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists("comparisons")
    .dropTableIfExists("integrations")
    .dropTableIfExists("versionsContracts")
    .dropTableIfExists("versionsSpecs")
    .dropTableIfExists("participant_versions")
    .dropTableIfExists("consumerContracts")
    .dropTableIfExists("providerSpecs")
    .dropTableIfExists("participants");
}

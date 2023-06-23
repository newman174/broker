import { Model } from "objection";
import Integration from "./Integration.js";
import Contract from "./Contract.js";

class Comparison extends Model {
  static get tableName() {
    return "comparisons";
  }

  static get idColumn() {
    return "comparison_id";
  }

  static get integrationIdColumn() {
    return "integration_id";
  }

  static get consumerContractIdColumn() {
    return "consumer_contract_id";
  }
  static get providerContractIdColumn() {
    return "provider_contract_id";
  }

  static get comparisonStatusColumn() {
    return "comparison_status";
  }

  static get comparisonDateColumn() {
    return "comparison__date";
  }

  static get relationMappings() {
    return {
      integration: {
        relation: Model.BelongsToOneRelation,
        modelClass: Integration,
        join: {
          from: "comparisons.integration_id",
          to: "integrations.integration_id",
        },
      },
      consumerContract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: "comparisons.consumer_contract_id",
          to: "contracts.contract_id",
        },
      },
      providerContract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: "comparisons.provider_contract_id",
          to: "contracts.contract_id",
        },
      },
    };
  }
}

export default Comparison;

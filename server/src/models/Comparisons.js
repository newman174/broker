import { Model } from "objection";
import Integration from "./Integration.js";
import Contract from "./Contract.js";

class Comparison extends Model {
  static get tableName() {
    return "comparisons";
  }

  static get idColumn() {
    return "comparisonId";
  }

  static get relationMappings() {
    return {
      integration: {
        relation: Model.BelongsToOneRelation,
        modelClass: Integration,
        join: {
          from: "comparisons.integrationId",
          to: "integrations.integrationId",
        },
      },
      consumerContract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: "comparisons.consumerContractId",
          to: "contracts.contractId",
        },
      },
      providerContract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: "comparisons.providerContractId",
          to: "contracts.contractId",
        },
      },
    };
  }
}

export default Comparison;

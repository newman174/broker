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

  static get integrationIdColumn() {
    return "integrationId";
  }

  static get consumerContractIdColumn() {
    return "consumerContractId";
  }
  static get providerContractIdColumn() {
    return "providerContractId";
  }

  static get comparisonStatusColumn() {
    return "comparisonStatus";
  }

  static get comparisonDateColumn() {
    return "comparisonDate";
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

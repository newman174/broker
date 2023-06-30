import { Model } from "objection";
import Integration from "./Integration.js";
import ConsumerContract from "./ConsumerContract.js";
import ProviderSpec from "./ProviderSpec.js";

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
        modelClass: ConsumerContract,
        join: {
          from: "comparisons.consumerContractId",
          to: "consumerContracts.consumerContractId",
        },
      },
      providerSpec: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProviderSpec,
        join: {
          from: "comparisons.providerSpecId",
          to: "providerSpecs.providerSpecId",
        },
      },
    };
  }
}

export default Comparison;

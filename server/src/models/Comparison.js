import BaseModel from "./BaseModel.js";
import Integration from "./Integration.js";
import ConsumerContract from "./ConsumerContract.js";
import ProviderSpec from "./ProviderSpec.js";

class Comparison extends BaseModel {
  static get tableName() {
    return "comparisons";
  }

  static get idColumn() {
    return "comparisonId";
  }

  static get relationMappings() {
    return {
      integration: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Integration,
        join: {
          from: "comparisons.integrationId",
          to: "integrations.integrationId",
        },
      },
      consumerContract: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ConsumerContract,
        join: {
          from: "comparisons.consumerContractId",
          to: "consumerContracts.consumerContractId",
        },
      },
      providerSpec: {
        relation: BaseModel.BelongsToOneRelation,
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

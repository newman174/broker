import BaseModel from "./BaseModel.js";
import Participant from "./Participant.js";
import Comparison from "./Comparison.js";
import ConsumerContract from "./ConsumerContract.js";

class Integration extends BaseModel {
  static get tableName() {
    return "integrations";
  }
  static get idColumn() {
    return "integrationId";
  }

  static get relationMappings() {
    return {
      consumer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "integrations.consumerId",
          to: "participants.participantId",
        },
      },
      consumerContracts: {
        relation: BaseModel.HasManyRelation,
        modelClass: ConsumerContract,
        join: {
          from: "integrations.integrationId",
          to: "consumerContracts.integrationId",
        },
      },
      provider: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "integrations.providerId",
          to: "participants.participantId",
        },
      },
      comparisons: {
        relation: BaseModel.HasManyRelation,
        modelClass: Comparison,
        join: {
          from: "integrations.integrationId",
          to: "comparisons.integrationId",
        },
      },
    };
  }
}

export default Integration;

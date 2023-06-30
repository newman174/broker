import { Model } from "objection";
import Participant from "./Participant.js";
import Comparison from "./Comparison.js";
import ConsumerContract from "./ConsumerContract.js";

class Integration extends Model {
  static get tableName() {
    return "integrations";
  }
  static get idColumn() {
    return "integrationId";
  }

  static get relationMappings() {
    return {
      consumer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "integrations.consumerId",
          to: "participants.participantId",
        },
      },
      consumerContracts: {
        relation: Model.HasManyRelation,
        modelClass: ConsumerContract,
        join: {
          from: "integrations.integrationId",
          to: "consumerContracts.integrationId",
        },
      },
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "integrations.providerId",
          to: "participants.participantId",
        },
      },
      comparisons: {
        relation: Model.HasManyRelation,
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

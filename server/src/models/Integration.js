import { Model } from "objection";
import Participant from "./Participant.js";
import Comparison from "./Comparison.js";

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

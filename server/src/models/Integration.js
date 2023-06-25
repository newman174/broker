import { Model } from "objection";
import Participant from "./Participant.js";

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
    };
  }
}

export default Integration;

import { Model } from "objection";
import Participant from "./Participant.js";

class Integration extends Model {
  static get tableName() {
    return "integrations";
  }
  static get idColumn() {
    return "integrationId";
  }

  static get consumerIdColumn() {
    return "consumerId";
  }

  static get providerIdColumn() {
    return "providerId";
  }

  static get relationMappings() {
    return {
      consumers: {
        relation: Model.BelongsToOne,
        modelClass: Participant,
        join: {
          from: "integrations.consumerId",
          to: "participants.participantId",
        },
      },
      providers: {
        relation: Model.BelongsToOne,
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

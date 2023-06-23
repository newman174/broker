import { Model } from "objection";
import Participant from "./Participant.js";

class Integration extends Model {
  static get tableName() {
    return "integrations";
  }
  static get idColumn() {
    return "integration_id";
  }

  static get consumerIdColumn() {
    return "consumer_id";
  }

  static get providerIdColumn() {
    return "provider_id";
  }

  static get relationMappings() {
    return {
      consumers: {
        relation: Model.BelongsToOne,
        modelClass: Participant,
        join: {
          from: "integrations.consumer_id",
          to: "participants.participant_id",
        },
      },
      providers: {
        relation: Model.BelongsToOne,
        modelClass: Participant,
        join: {
          from: "integrations.provider_id",
          to: "participants.participant_id",
        },
      },
    };
  }
}

export default Integration;

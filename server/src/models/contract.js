import { Model } from "objection";
import Participant from "./participant.js";

class Contract extends Model {
  static get tableName() {
    return "contracts";
  }

  static get idColumn() {
    return "contract_id";
  }

  static get participantIdColumn() {
    return "participant_id";
  }

  static get contractColumn() {
    return "contract";
  }

  static get publishDateColumn() {
    return "publish_date";
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "contracts.participant_id",
          to: "participants.participant_id",
        },
      },
    };
  }
}

export default Contract;

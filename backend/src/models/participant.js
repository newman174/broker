import { Model } from "objection";
import Contract from "./contract.js";

class Participant extends Model {
  static get tableName() {
    return "participants";
  }
  static get idColumn() {
    return "participant_id";
  }

  static get participantNameColumn() {
    return "participant_name";
  }

  static get relationMappings() {
    return {
      contracts: {
        relation: Model.HasManyRelation,
        modelClass: Contract,
        join: {
          from: "participants.participant_id",
          to: "contracts.participant_id",
        },
      },
    };
  }
}

export default Participant;

import { Model } from "objection";
import Contract from "./Contract.js";
import Participant from "./Participant.js";

class ParticipantVersion extends Model {
  static get tableName() {
    return "participantVersions";
  }
  static get idColumn() {
    return "participantVersionId";
  }

  static get relationMappings() {
    return {
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: "participantVersions.contractId",
          to: "contracts.contractId",
        },
      },
      participant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "participantVersions.participantId",
          to: "participants.participantId",
        },
      },
    };
  }
}

export default ParticipantVersion;

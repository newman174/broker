import { Model } from "objection";
import Contract from "./Contract.js";

class ParticipantVersion extends Model {
  static get tableName() {
    return "participantVersions";
  }
  static get idColumn() {
    return "participantVersionId";
  }

  static get contractIdColumn() {
    return "contractId";
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
    };
  }
}

export default ParticipantVersion;

import { Model } from "objection";
import Contract from "./Contract.js";

class ParticipantVersion extends Model {
  static get tableName() {
    return "participant_versions";
  }
  static get idColumn() {
    return "participant_version_id";
  }

  static get contractIdColumn() {
    return "contract_id";
  }

  static get relationMappings() {
    return {
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: "participant_versions.contract_id",
          to: "contracts.contract_id",
        },
      },
    };
  }
}

export default ParticipantVersion;

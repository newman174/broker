import { Model } from "objection";
import ParticipantVersion from "./ParticipantVersion.js";
import ProviderSpec from "./ProviderSpec.js";

class VersionSpec extends Model {
  static get tableName() {
    return "versionsSpecs";
  }
  static get idColumn() {
    return "versionSpecId";
  }

  static get relationMappings() {
    return {
      providerVersion: {
        relation: Model.BelongsToOneRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "versionSpecs.providerVersionId",
          to: "participantVersions.participantVersionId",
        },
      },
      providerSpec: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProviderSpec,
        join: {
          from: "versionSpecs.providerSpecId",
          to: "providerSpecs.providerSpecId",
        },
      },
    };
  }
}

export default VersionSpec;

import BaseModel from "./BaseModel.js";
import ParticipantVersion from "./ParticipantVersion.js";
import ProviderSpec from "./ProviderSpec.js";

class VersionSpec extends BaseModel {
  static get tableName() {
    return "versionsSpecs";
  }
  static get idColumn() {
    return "versionSpecId";
  }

  static get relationMappings() {
    return {
      providerVersion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "versionSpecs.providerVersionId",
          to: "participantVersions.participantVersionId",
        },
      },
      providerSpec: {
        relation: BaseModel.BelongsToOneRelation,
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

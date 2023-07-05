import BaseModel from "./BaseModel.js";
import ParticipantVersion from "./ParticipantVersion.js";
import Environment from "./Environment.js";

class VersionEnvironment extends BaseModel {
  static get tableName() {
    return "versionsEnvironments";
  }
  static get idColumn() {
    return "versionEnvironmentId";
  }

  static get relationMappings() {
    return {
      participantVersion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "versionsEnvironments.participantVersionId",
          to: "participantVersions.participantVersionId",
        },
      },
      environment: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Environment,
        join: {
          from: "versionsEnvironments.environmentId",
          to: "environments.environmentId",
        },
      },
    };
  }
}

export default VersionEnvironment;
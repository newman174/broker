import BaseModel from "./BaseModel.js";
import ParticipantVersion from "./ParticipantVersion.js";

class Environment extends BaseModel {
  static get tableName() {
    return "environments";
  }

  static get idColumn() {
    return "environmentId";
  }

  static get relationMappings() {
    return {
      providerVersions: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "environments.environmentId",
          through: {
            from: "versionsEnvironments.environmentId",
            to: "versionsEnvironments.participantVersionId",
          },
          to: "participantVersions.participantVersionId",
        },
      },
    };
  }
}

export default Environment;
import BaseModel from "./BaseModel.js";
import ParticipantVersion from "./ParticipantVersion.js";
import ConsumerContract from "./ConsumerContract.js";

class VersionContract extends BaseModel {
  static get tableName() {
    return "versionsContracts";
  }
  static get idColumn() {
    return "versionContractId";
  }

  static get relationMappings() {
    return {
      consumerVersion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "versionsContracts.consumerVersionId",
          to: "participantVersions.participantVersionId",
        },
      },
      consumerContract: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ConsumerContract,
        join: {
          from: "versionsContracts.consumerContractId",
          to: "consumerContracts.consumerContractId",
        },
      },
    };
  }
}

export default VersionContract;

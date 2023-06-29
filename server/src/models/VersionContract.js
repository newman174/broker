import { Model } from "objection";
import ParticipantVersion from "./ParticipantVersion.js";
import ConsumerContract from "./ConsumerContract.js";

class VersionContract extends Model {
  static get tableName() {
    return "versionsContracts";
  }
  static get idColumn() {
    return "versionContractId";
  }

  static get relationMappings() {
    return {
      consumerVersion: {
        relation: Model.BelongsToOneRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "versionsContracts.consumerVersionId",
          to: "participantVersions.participantVersionId",
        },
      },
      consumerContract: {
        relation: Model.BelongsToOneRelation,
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

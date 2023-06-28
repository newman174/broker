import { Model } from "objection";
import ParticipantVersion from "./ParticipantVersion";
import ConsumerContract from "./ConsumerContract";

class VersionContract extends Model {
  static get tableName() {
    return "versionContracts";
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
          from: "versionContracts.consumerVersionId",
          to: "participantVersions.participantVersionId",
        },
      },
      consumerContract: {
        relation: Model.BelongsToOneRelation,
        modelClass: ConsumerContract,
        join: {
          from: "versionContracts.consumerContractId",
          to: "consumerContracts.consumerContractId",
        },
      },
    };
  }
}

export default VersionContract;

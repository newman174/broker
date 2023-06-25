import { Model } from "objection";
import Participant from "./Participant.js";
import ParticipantVersion from "./ParticipantVersion.js";

class Contract extends Model {
  static get tableName() {
    return "contracts";
  }

  static get idColumn() {
    return "contractId";
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "contracts.participantId",
          to: "participants.participantId",
        },
      },
      participantVersions: {
        relation: Model.HasManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "contracts.contractId",
          to: "participantVersions.contractId",
        },
      },
      comparedProviderContracts: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
        join: {
          from: "contracts.contractId",
          through: {
            from: "comparisons.consumerId",
            to: "comparisons.providerId",
          },
          to: "contracts.contractId",
        },
      },
      comparedConsumerContracts: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
        join: {
          from: "contracts.contractId",
          through: {
            from: "comparisons.providerId",
            to: "comparisons.consumerId",
          },
          to: "contracts.contractId",
        },
      },
    };
  }
}

export default Contract;

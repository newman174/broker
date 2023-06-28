import { Model } from "objection";
import Participant from "./Participant.js";
import ParticipantVersion from "./ParticipantVersion.js";
import ProviderSpec from "./ProviderSpec.js";

class ConsumerContract extends Model {
  static get tableName() {
    return "consumerContracts";
  }

  static get idColumn() {
    return "consumerContractId";
  }

  static get relationMappings() {
    return {
      consumer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "consumerContracts.consumerId",
          to: "participants.participantId",
        },
      },
      consumerVersions: {
        relation: Model.ManyToManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "consumerContracts.consumerContractId",
          through: {
            from: "versionsContracts.consumerContractId",
            to: "versionsContracts.consumerVersionId",
          },
        },
        to: "participantVersions.participantVersionId",
      },
      comparedProviderSpecs: {
        relation: Model.ManyToManyRelation,
        modelClass: ProviderSpec,
        join: {
          from: "consumerContracts.consumerContractId",
          through: {
            from: "comparisons.consumerId",
            to: "comparisons.providerId",
          },
          to: "providerSpecs.providerSpecId",
        },
      },
    };
  }
}

export default ConsumerContract;

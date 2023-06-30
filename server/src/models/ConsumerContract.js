import BaseModel from "./BaseModel.js";
import Participant from "./Participant.js";
import Integration from "./Integration.js";
import ParticipantVersion from "./ParticipantVersion.js";
import ProviderSpec from "./ProviderSpec.js";

class ConsumerContract extends BaseModel {
  static get tableName() {
    return "consumerContracts";
  }

  static get idColumn() {
    return "consumerContractId";
  }

  static get relationMappings() {
    return {
      consumer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "consumerContracts.consumerId",
          to: "participants.participantId",
        },
      },
      integration: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Integration,
        join: {
          from: "consumerContracts.integrationId",
          to: "integrations.integrationId",
        },
      },
      consumerVersions: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "consumerContracts.consumerContractId",
          through: {
            from: "versionsContracts.consumerContractId",
            to: "versionsContracts.consumerVersionId",
          },
          to: "participantVersions.participantVersionId",
        },
      },
      comparedProviderSpecs: {
        relation: BaseModel.ManyToManyRelation,
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

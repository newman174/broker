import { Model } from "objection";
import ConsumerContract from "./ConsumerContract.js";
import ProviderSpec from "./ProviderSpec.js";
import Integration from "./Integration.js";
import ParticipantVersion from "./ParticipantVersion.js";

class Participant extends Model {
  static get tableName() {
    return "participants";
  }
  static get idColumn() {
    return "participantId";
  }

  static get relationMappings() {
    return {
      consumerContracts: {
        relation: Model.HasManyRelation,
        modelClass: ConsumerContract,
        join: {
          from: "participants.participantId",
          to: "consumerContracts.consumerId",
        },
      },
      providerSpecs: {
        relation: Model.HasManyRelation,
        modelClass: ProviderSpec,
        join: {
          from: "participants.participantId",
          to: "providerSpecs.providerId",
        },
      },
      comparedProviders: {
        relation: Model.ManyToManyRelation,
        modelClass: Participant,
        join: {
          from: "participants.participantId",
          through: {
            from: "integrations.consumerId",
            to: "integrations.providerId",
          },
          to: "participants.participantId",
        },
      },
      comparedConsumers: {
        relation: Model.ManyToManyRelation,
        modelClass: Participant,
        join: {
          from: "participants.participantId",
          through: {
            from: "integrations.providerId",
            to: "integrations.consumerId",
          },
          to: "participants.participantId",
        },
      },
      integrationsAsConsumer: {
        relation: Model.HasManyRelation,
        modelClass: Integration,
        join: {
          from: "participants.participantId",
          to: "integrations.consumerId",
        },
      },
      integrationsAsProvider: {
        relation: Model.HasManyRelation,
        modelClass: Integration,
        join: {
          from: "participants.participantId",
          to: "integrations.providerId",
        },
      },
      versions: {
        relation: Model.HasManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "participants.participantId",
          to: "participantVersions.participantId",
        },
      },
    };
  }
}

export default Participant;

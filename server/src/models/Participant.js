import { Model } from "objection";
import Contract from "./Contract.js";
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
      contracts: {
        relation: Model.HasManyRelation,
        modelClass: Contract,
        join: {
          from: "participants.participantId",
          to: "contracts.participantId",
        },
      },
      comparedProviders: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
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
        modelClass: Contract,
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

import { Model } from "objection";
import Contract from "./Contract.js";

class Participant extends Model {
  static get tableName() {
    return "participants";
  }
  static get idColumn() {
    return "participantId";
  }

  static get participantNameColumn() {
    return "participantName";
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
    };
  }
}

export default Participant;

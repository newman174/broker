import { Model } from "objection";
import Contract from "./Contract.js";

class Participant extends Model {
  static get tableName() {
    return "participants";
  }
  static get idColumn() {
    return "participant_id";
  }

  static get participantNameColumn() {
    return "participant_name";
  }

  static get relationMappings() {
    return {
      contracts: {
        relation: Model.HasManyRelation,
        modelClass: Contract,
        join: {
          from: "participants.participant_id",
          to: "contracts.participant_id",
        },
      },
      comparedProviders: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
        join: {
          from: "participants.participant_id",
          through: {
            from: "integrations.consumer_id",
            to: "integrations.provider_id",
          },
          to: "participants.participant_id",
        },
      },
      comparedConsumers: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
        join: {
          from: "participants.participant_id",
          through: {
            from: "integrations.provider_id",
            to: "integrations.consumer_id",
          },
          to: "participants.participant_id",
        },
      },
    };
  }
}

export default Participant;

import { Model } from "objection";
import Participant from "./Participant.js";
import ParticipantVersion from "./ParticipantVersion.js";

class Contract extends Model {
  static get tableName() {
    return "contracts";
  }

  static get idColumn() {
    return "contract_id";
  }

  static get participantIdColumn() {
    return "participant_id";
  }

  static get contractColumn() {
    return "contract";
  }

  static get publishDateColumn() {
    return "publish_date";
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "contracts.participant_id",
          to: "participants.participant_id",
        },
      },
      participantVersions: {
        relation: Model.HasManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "contracts.contract_id",
          to: "participant_versions.contract_id",
        },
      },
      comparedProviderContracts: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
        join: {
          from: "contracts.contract_id",
          through: {
            from: "comparisons.consumer_id",
            to: "comparisons.provider_id",
          },
          to: "contracts.contract_id",
        },
      },
      comparedConsumerContracts: {
        relation: Model.ManyToManyRelation,
        modelClass: Contract,
        join: {
          from: "contracts.contract_id",
          through: {
            from: "comparisons.provider_id",
            to: "comparisons.consumer_id",
          },
          to: "contracts.contract_id",
        },
      },
    };
  }
}

export default Contract;

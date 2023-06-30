import { Model } from "objection";
import Participant from "./Participant.js";
import ParticipantVersion from "./ParticipantVersion.js";
import ConsumerContract from "./ConsumerContract.js";

class ProviderSpec extends Model {
  static get tableName() {
    return "providerSpecs";
  }

  static get idColumn() {
    return "providerSpecId";
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "providerSpecs.providerId",
          to: "participants.participantId",
        },
      },
      providerVersions: {
        relation: Model.ManyToManyRelation,
        modelClass: ParticipantVersion,
        join: {
          from: "providerSpecs.providerSpecId",
          through: {
            from: "versionsSpecs.providerSpecId",
            to: "versionsSpecs.providerVersionId",
          },
        },
        to: "participantVersions.participantVersionId",
      },
      comparedConsumerContracts: {
        relation: Model.ManyToManyRelation,
        modelClass: ConsumerContract,
        join: {
          from: "providerSpecs.providerSpecId",
          through: {
            from: "comparisons.providerId",
            to: "comparisons.consumerId",
          },
          to: "consumerContracts.consumerContractId",
        },
      },
    };
  }
}

export default ProviderSpec;

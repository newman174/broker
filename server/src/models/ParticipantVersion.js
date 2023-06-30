import { Model } from "objection";
import ConsumerContract from "./ConsumerContract.js";
import ProviderSpec from "./ProviderSpec.js";
import Participant from "./Participant.js";

class ParticipantVersion extends Model {
  static get tableName() {
    return "participantVersions";
  }
  static get idColumn() {
    return "participantVersionId";
  }

  static get relationMappings() {
    return {
      consumerContracts: {
        relation: Model.ManyToManyRelation,
        modelClass: ConsumerContract,
        join: {
          from: "participantVersions.contractId",
          to: "versionsContracts.consumerContractId",
        },

        to: "consumerContracts.consumerContractId",
      },
      providerSpecs: {
        relation: Model.ManyToManyRelation,
        modelClass: ProviderSpec,
        join: {
          from: "participantVersions.contractId",
          to: "versionsSpecs.providerSpecId",
        },

        to: "providerSpecs.providerSpecId",
      },
      participant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Participant,
        join: {
          from: "participantVersions.participantId",
          to: "participants.participantId",
        },
      },
    };
  }
}

export default ParticipantVersion;

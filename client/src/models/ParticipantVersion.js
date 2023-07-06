import BaseModel from "./BaseModel.js";
import Contract from "./Contract.js";
import Participant from "./Participant.js";
import Spec from "./Spec.js";

class ParticipantVersion extends BaseModel {
  constructor({
    participantVersionId,
    consumerContracts = [],
    providerSpecs = [],
    participant = {},
    createdAt,
    updatedAt,
    participantVersion,
    participantId,
    participantBranch,
    environments = [],
  }) {
    super({ createdAt, updatedAt });
    this.id = participantVersionId;
    this.consumerContracts = consumerContracts.map(
      (contract) => new Contract(contract)
    );
    this.providerSpecs = providerSpecs.map((spec) => new Spec(spec));
    this.participant = new Participant(participant);
    this.version = participantVersion;
    this.participantId = participantId;
    this.participantBranch = participantBranch;
    this.environments = environments;
  }
}

export default ParticipantVersion;

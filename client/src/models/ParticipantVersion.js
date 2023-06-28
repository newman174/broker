import BaseModel from "./BaseModel.js";
import Contract from "./Contract.js";
import Participant from "./Participant.js";

class ParticipantVersion extends BaseModel {
  constructor({
    participantVersionId,
    contract = {},
    participant = {},
    createdAt,
    updatedAt,
    participantVersion,
    participantId,
    participantBranch,
  }) {
    super({ createdAt, updatedAt });
    this.id = participantVersionId;
    this.contract = new Contract(contract);
    this.participant = new Participant(participant);
    this.version = participantVersion;
    this.participantId = participantId;
    this.participantBranch = participantBranch;
  }
}

export default ParticipantVersion;

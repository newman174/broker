import ParticipantVersion from "./ParticipantVersion";
import Participant from "./Participant.js";
import BaseModel from "./BaseModel";

class Contract extends BaseModel {
  constructor({
    contractId,
    participantId,
    contract = {},
    contractType,
    contractFormat,
    contractHash,
    createdAt,
    updatedAt,
    owner = {},
    participantVersions = [],
    comparedProviderContracts = [],
    comparedConsumerContracts = [],
  }) {
    super({ createdAt, updatedAt });
    this.id = contractId;
    this.participantId = participantId;
    this.contract = contract;
    this.type = contractType;
    this.format = contractFormat;
    this.hash = contractHash;
    this.owner = new Participant(owner);
    this.participantVersions = participantVersions.map(
      (version) => new ParticipantVersion(version)
    );
    this.comparedProviderContracts = comparedProviderContracts.map(
      (contract) => new Contract(contract)
    );
    this.comparedConsumerContracts = comparedConsumerContracts.map(
      (contract) => new Contract(contract)
    );
  }
}

export default Contract;

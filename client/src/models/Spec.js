import ParticipantVersion from "./ParticipantVersion";
import Participant from "./Participant.js";
import BaseModel from "./BaseModel";
import Contract from "./Contract";

class Spec extends BaseModel {
  constructor({
    providerSpecId,
    providerId,
    spec = {},
    specFormat,
    specHash,
    createdAt,
    updatedAt,
    provider = {},
    providerVersions = [],
    comparedConsumerContracts = [],
  }) {
    super({ createdAt, updatedAt });
    this.id = providerSpecId;
    this.providerId = providerId;
    this.spec = spec.specText;
    this.format = specFormat;
    this.hash = specHash;
    this.provider = new Participant(provider);
    this.providerVersions = providerVersions.map(
      (version) => new ParticipantVersion(version)
    );
    this.comparedConsumerContracts = comparedConsumerContracts.map(
      (contract) => new Contract(contract)
    );
  }
}

export default Spec;

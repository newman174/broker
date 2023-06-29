import BaseModel from "./BaseModel.js";
import Contract from "./Contract.js";
import Integration from "./Integration.js";
import ParticipantVersion from "./ParticipantVersion.js";

class Participant extends BaseModel {
  constructor({
    participantId,
    participantName,
    createdAt,
    updatedAt,
    contracts = [],
    integrationsAsConsumer = [],
    integrationsAsProvider = [],
    versions = [],
    comparedConsumers = [],
    comparedProviders = [],
  }) {
    super({ createdAt, updatedAt });
    this.id = participantId;
    this.name = participantName;
    this.contracts = contracts.map((contract) => new Contract(contract));
    this.integrationsAsConsumer = integrationsAsConsumer.map(
      (int) => new Integration(int)
    );
    this.integrationsAsProvider = integrationsAsProvider.map(
      (int) => new Integration(int)
    );
    this.versions = versions.map((version) => new ParticipantVersion(version));
    this.comparedConsumers = comparedConsumers.map(
      (consumer) => new Participant(consumer)
    );
    this.comparedProviders = comparedProviders.map(
      (provider) => new Participant(provider)
    );
  }
}

export default Participant;

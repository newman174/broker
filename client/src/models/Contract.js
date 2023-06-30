import BaseModel from "./BaseModel";
import Integration from "./Integration";
import ParticipantVersion from "./ParticipantVersion";
import Participant from "./Participant.js";
import Spec from "./Spec";

class Contract extends BaseModel {
  constructor({
    consumerContractId,
    consumerId,
    integrationId,
    contract = {},
    contractFormat,
    contractHash,
    createdAt,
    updatedAt,
    consumer = {},
    integration = {},
    consumerVersions = [],
    comparedProviderSpecs = [],
  }) {
    super({ createdAt, updatedAt });
    this.id = consumerContractId;
    this.consumerId = consumerId;
    this.integrationId = integrationId;
    this.contract = contract;
    this.format = contractFormat;
    this.hash = contractHash;
    this.consumer = new Participant(consumer);
    this.integration = new Integration(integration);
    this.consumerVersions = consumerVersions.map(
      (version) => new ParticipantVersion(version)
    );
    this.comparedProviderSpecs = comparedProviderSpecs.map(
      (spec) => new Spec(spec)
    );
  }
}

export default Contract;

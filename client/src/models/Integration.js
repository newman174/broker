import BaseModel from "./BaseModel";
import Comparison from "./Comparison";
import Contract from "./Contract";
import Participant from "./Participant";

class Integration extends BaseModel {
  constructor({
    integrationId,
    consumerId,
    providerId,
    provider = {},
    consumer = {},
    consumerContracts = [],
    comparisons = [],
    createdAt,
    updatedAt,
  }) {
    super({ createdAt, updatedAt });
    this.id = integrationId;
    this.consumerId = consumerId;
    this.providerId = providerId;
    this.provider = new Participant(provider);
    this.consumer = new Participant(consumer);
    this.consumerContracts = consumerContracts.map(
      (contract) => new Contract(contract)
    );
    this.comparisons = comparisons.map(
      (comparison) => new Comparison(comparison)
    );
  }
}

export default Integration;

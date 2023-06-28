import Participant from "./Participant";
import Comparison from "./Comparison";
import BaseModel from "./BaseModel";

class Integration extends BaseModel {
  constructor({
    integrationId,
    consumerId,
    providerId,
    consumer = {},
    provider = {},
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
    this.comparisons = comparisons.map(
      (comparison) => new Comparison(comparison)
    );
  }
}

export default Integration;

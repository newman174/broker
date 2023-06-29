import BaseModel from "./BaseModel.js";
import Contract from "./Contract.js";
import Integration from "./Integration.js";

class Comparison extends BaseModel {
  constructor({
    comparisonId,
    integrationId,
    consumerContractId,
    providerSpecId,
    comparisonStatus,
    result,
    createdAt,
    updatedAt,
    consumerContract = {},
    providerContract = {},
    integration = {},
  }) {
    super({ createdAt, updatedAt });
    this.id = comparisonId;
    this.integrationId = integrationId;
    this.consumerContractId = consumerContractId;
    this.providerSpecId = providerSpecId;
    this.status = comparisonStatus;
    this.result = result;
    this.integration = new Integration(integration);
    this.consumerContract = new Contract(consumerContract);
    this.providerContract = new Contract(providerContract);
  }
}

export default Comparison;

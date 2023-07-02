import BaseModel from "./BaseModel.js";
import Contract from "./Contract.js";
import Integration from "./Integration.js";
import Spec from "./Spec.js";

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
    providerSpec = {},
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
    this.providerSpec = new Spec(providerSpec);
  }
}

export default Comparison;

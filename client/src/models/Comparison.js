class Comparison {
  constructor({
    comparisonId,
    integrationId,
    consumerContractId,
    providerSpecId,
    comparisonStatus,
    result,
    createdAt,
    updatedAt,
    consumerContract,
    providerContract,
  }) {
    this.id = comparisonId;
    this.integrationId = integrationId;
    this.consumerContractId = consumerContractId;
    this.providerSpecId = providerSpecId;
    this.status = comparisonStatus;
    this.result = result;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.consumerContract = consumerContract;
    this.providerContract = providerContract;
  }
}

export default Comparison;

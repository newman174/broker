import "dotenv/config";
import Verifier from "./verification.js";
import Comparison from "../models/Comparison.js";
import db from "../db/databaseClient.js";

export const compare = async (
  contractRecord,
  specRecord,
  integration
) => {
  const verifier = new Verifier();

  try {
    const result = await verifier.verify2(
      contractRecord.contract.contractText,
      specRecord.spec.specText
    );

    const comparisonStatus = result.success ? "Success" : "Failed";

    const comparison = await Comparison.query().insert({
      integrationId: integration.integrationId,
      consumerContractId: contractRecord.consumerContractId,
      providerSpecId: specRecord.providerSpecId,
      result,
      comparisonStatus: comparisonStatus,
    });

    return comparison;
  } catch (err) {
    console.log(err);
  }
};

export const compareWithProviderSpecs = async (consumerContractId) => {
  const contractRecord = db.getConsumerContract(consumerContractId);

  const providerName = contractRecord.contract.contractText.provider.name;
  const providerId = db.getProviderId(providerName);

  const integration = db.getIntegration(contractRecord.consumerId, providerId);

  const specRecords = await db.getProviderSpecs(providerId);

  // iterate over all of this provider's specs, and compare them with this consumer contract
  for (let specRecord of specRecords) {
    compare(contractRecord, specRecord, integration);
  }
};

export const compareWithConsumerContracts = async (specId) => {
  const specRecord = db.getProviderSpec(specId);
  const integrations = db.getIntegrationsByProviderId(specRecord.providerId);

  for (let integration of integrations) {
    const contractRecords = db.getConsumerContracts(integration.consumerId);

    for (let contractRecord of contractRecords) {
      compare(contractRecord, specRecord, integration);
    }
  }
};
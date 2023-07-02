import "dotenv/config";
import Verifier from "./verification.js";
import Comparison from "../models/Comparison.js";
import db from "../db/databaseClient.js";
import { findAndUpdateOrCreate } from "../utils/queryHelpers.js";

class ComparisonService {
  async compare(contractRecord, specRecord, integration) {
    const verifier = new Verifier();

    try {
      const result = await verifier.verify2(
        contractRecord.contract.contractText,
        specRecord.spec.specText
      );

      const comparisonStatus = result.success ? "Success" : "Failed";

      console.log('COMPARISON STATUS', comparisonStatus);

      const comparison = await findAndUpdateOrCreate(
        Comparison,
        {
          integrationId: integration.integrationId,
          consumerContractId: contractRecord.consumerContractId,
          providerSpecId: specRecord.providerSpecId,
        },
        {
          integrationId: integration.integrationId,
          consumerContractId: contractRecord.consumerContractId,
          providerSpecId: specRecord.providerSpecId,
          result,
          comparisonStatus: comparisonStatus,
        }
      );

      console.log('COMPARISON: ', comparison.result.errors);

      return comparison;
    } catch (err) {
      console.log(err);
    }
  }

  async compareWithProviderSpecs(consumerContractId) {
    const contractRecord = await db.getConsumerContract(consumerContractId);

    const providerName = contractRecord.contract.contractText.provider.name;
    const providerId = await db.getProviderId(providerName);

    const integration = await db.getIntegration(
      contractRecord.consumerId,
      providerId
    );

    const specRecords = await db.getProviderSpecs(providerId);

    // iterate over all of this provider's specs, and compare them with this consumer contract
    for (let specRecord of specRecords) {
      this.compare(contractRecord, specRecord, integration);
    }
  }

  async compareWithConsumerContracts(specId) {
    const specRecord = await db.getProviderSpec(specId);
    const integrations = await db.getIntegrationsByProviderId(
      specRecord.providerId
    );

    for (let integration of integrations) {
      const contractRecords = await db.getConsumerContractsByIntegrationId(
        integration.integrationId
      );

      for (let contractRecord of contractRecords) {
        this.compare(contractRecord, specRecord, integration);
      }
    }
  }
}

export default new ComparisonService();

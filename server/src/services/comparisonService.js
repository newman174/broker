import "dotenv/config";
import Verifier from "./verification.js";
import Comparison from "../models/Comparison.js";

// export const comparisonQueue = [];

export const compare = async (
  consumerContract,
  providerContract,
  integration
) => {
  const verifier = new Verifier();

  try {
    const result = await verifier.verify2(
      consumerContract.contract.contractText,
      providerContract.contract.contractText
    );

    const comparisonStatus = result.success ? "Success" : "Failed";

    const comparison = await Comparison.query().insert({
      integrationId: integration.integrationId,
      consumerContractId: consumerContract.contractId,
      providerContractId: providerContract.contractId,
      result,
      comparisonStatus: comparisonStatus,
    });

    return comparison;
  } catch (err) {
    console.log(err);
  }
};

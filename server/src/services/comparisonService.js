import Integration from "../models/Integration.js";
import "dotenv/config";
import fs from "node:fs";
import knex from "../db/db.js";
import Verifier from "./verification.js";
import Comparison from "../models/Comparison.js";
import { findOrCreate } from "../utils/queryHelpers.js";

// export const comparisonQueue = [];

const compare = async (integrationId) => {
  const integration = await Integration.query()
    .findById(integrationId)
    .withGraphJoined("[consumer.contracts, provider.contracts]");

  console.log(integration);

  const { consumer, provider } = integration;

  const consumerContracts = consumer.contracts;
  const providerContracts = provider.contracts;

  const comparisons = [];

  const verifier = new Verifier();

  for (const consumerContract of consumerContracts) {
    for (const providerContract of providerContracts) {
      try {
        const comparison = await verifier.verify(
          consumerContract.contract.contractText,
          providerContract.contract.contractText
        );
        comparisons.push({
          ...comparison,
          foo: "bar",
          consumerContractId: consumerContract.contractId,
          providerContractId: providerContract.contractId,
        });
      } catch (err) {
        comparisons.push({
          ...err,
          foo: "bar",
          consumerContractId: consumerContract.contractId,
          providerContractId: providerContract.contractId,
        });
      }
    }
  }

  let newComparisons = comparisons.map((comparison) =>
    findOrCreate(
      Comparison,
      {
        consumerContractId: comparison.consumerContractId,
        providerContractId: comparison.providerContractId,
        integrationId: integrationId,
      },
      {
        consumerContractId: comparison.consumerContractId,
        providerContractId: comparison.providerContractId,
        integrationId: integrationId,
        comparisonStatus: comparison.pass,
      }
    )
  );

  newComparisons = await Promise.all(newComparisons);

  console.log("\n\ncomparisons:");
  console.log(newComparisons);
  console.log("\n\nend:");

  fs.writeFileSync("comparisons.json", JSON.stringify(newComparisons, null, 2));
  await knex.destroy();
};

compare(4);

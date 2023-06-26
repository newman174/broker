import Integration from "../models/Integration.js";
import "dotenv/config";
import fs from "node:fs";
import knex from "../db/db.js";
import Verifier from "./verification.js";

// export const comparisonQueue = [];

const compare = async (integrationId) => {
  const integration = await Integration.query()
    .findById(integrationId)
    .withGraphJoined("[consumer.contracts, provider.contracts]");

  console.log(integration);

  const { consumer, provider } = integration;

  const consumerContracts = consumer.contracts;
  const providerContracts = provider.contracts;

  const consumerContractTexts = consumerContracts.map(
    (contract) => contract.contract.contractText
  );
  const providerContractTexts = providerContracts.map(
    (contract) => contract.contract.contractText
  );

  // console.log(consumerContracts);
  // console.log(providerContracts);

  const comparisons = [];

  const verifier = new Verifier();

  for (const consumerContractText of consumerContractTexts) {
    for (const providerContractText of providerContractTexts) {
      try {
        const comparison = await verifier.verify(
          consumerContractText,
          providerContractText
        );
        comparisons.push(comparison);
      } catch (err) {
        comparisons.push(err);
      }
    }
  }
  console.log("\n\ncomparisons:");
  console.log(comparisons);
  console.log("\n\nend:");

  fs.writeFile("comparisons.json", JSON.stringify(comparisons), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  await knex.destroy();
};

compare(4);

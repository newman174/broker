import express from "express";
// import Contract from "../../models/Contract.js";
import db from "../../db/databaseClient.js";
import { compare, compareWithProviderSpecs, compareWithConsumerContracts } from "../../services/comparisonService.js";
import { newGraphMiddleware } from "../../utils/queryHelpers.js";
import { validateSchema } from "../../services/contractSchema.js";
import YAML from "yaml";
const router = express.Router();

const ALLOWED_GRAPH = [
  "owner.versions",
  "participantVersions",
  "comparedProviderContracts",
  "comparedConsumerContracts",
];

// const contractGraphMiddleware = newGraphMiddleware(Contract, ALLOWED_GRAPH);

/**
 * Gets all contracts
 * @param {string[]} joinGraph - The graph to join
 * @returns {object[]} All contracts
 */
router.get("/", contractGraphMiddleware, async (_req, res) => {
  const contracts = await res.locals.query;
  res.json(contracts);
});

/**
 * Creates a new contract
 * @param {'provider'|'consumer'} contractType - The type of contract
 * @param {string} contract - The contract
 * @param {string} participantName - The participant name
 * @param {string} participantVersion - The participant version
 * @param {string} participantBranch - The participant branch
 * @param {'json'|'yaml'} contractFormat - The contract format
 * @returns {object} The created contract
 * TODO: whenever a contract is added, it is compared to the contracts of its counterparties. make as middleware?
 */
router.post("/", async (req, res) => {
  const { contractType } = req.body;

  if (contractType === "consumer") {
    const {
      contract,
      consumerName: participantName,
      consumerVersion: participantVersion,
      consumerBranch: participantBranch,
    } = req.body;

    if (!(await validateSchema(contract, "consumer"))) {
      return res
        .status(400)
        .json({ error: "Contract schema is invalid" });
    }

    const consumer = await db.getParticipant(consumerName);
    
    if (await db.participantVersionExists(consumer.consumerId, consumerVersion)) {
      return res
        .status(409)
        .json({ error: "Participant version already exists" });
    }

    const contractId = await db.publishConsumerContract(contract, consumer.id, consumerVersion, consumerBranch);

    res.status(201).json(contract);

    compareWithProviderSpecs(contractId);
  } else if (contractType === "provider") {
    const {
      contract,
      providerName: participantName,
      specFormat: contractFormat,
    } = req.body;

    const spec =
    specFormat === "json" ? contract : YAML.parse(contract);

    if (!(await validateSchema(spec, "provider"))) {
      return res
        .status(400)
        .json({ error: "Contract schema is invalid" });
    }

    const provider = await db.getParticipant(providerName);

    const specId = await db.publishProviderSpec(spec, provider.id, specFormat);

    res.status(201).json(contract);

    compareWithConsumerContracts(specId);
  } else {
    res.status(400).json({ error: "Invalid contractType" });
  }
})

/**
 * Gets a contract by id
 * @param {number} id - The contract id
 * @param {string[]} joinGraph - The graph to join
 * @returns {object} The contract
 */
router.get("/:id", contractGraphMiddleware, async (req, res) => {
  const { query } = res.locals;
  const id = Number(req.params.id);
  const contract = await query.findById(id);

  if (!contract) {
    res.status(404).send();
  } else {
    res.json(contract);
  }
});

/**
 * Updates a contract by id
 * @param {number} id - The contract id
 * @param {string} contractType - The type of contract
 * @param {string} contract - The contract
 * @returns {object} The updated contract
 */
router.put("/:id", async (req, res) => {
  const { contractType, contract } = req.body;
  const id = Number(req.params.id);
  const updatedContract = await Contract.query().patchAndFetchById(id, {
    contractType,
    contract,
  });
  res.json(updatedContract);
});

/**
 * Deletes a contract by id
 * @param {number} id - The contract id
 * @returns {object} The deleted contract
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const contract = await Contract.query().deleteById(Number(id));
    if (!contract) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send();
  }
});

export default router;

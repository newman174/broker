import express from "express";
import Contract from "../../models/Contract.js";
import Participant from "../../models/Participant.js";
import ParticipantVersion from "../../models/ParticipantVersion.js";
import Integration from "../../models/Integration.js";
import objectHash from "object-hash";
import { compare } from "../../services/comparisonService.js";
import { findOrCreate, newGraphMiddleware } from "../../utils/queryHelpers.js";
import { validateSchema } from "../../services/contractSchema.js";
import YAML from "yaml";
const router = express.Router();

const ALLOWED_GRAPH = [
  "owner.versions",
  "participantVersions",
  "comparedProviderContracts",
  "comparedConsumerContracts",
];

const contractGraphMiddleware = newGraphMiddleware(Contract, ALLOWED_GRAPH);

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
  const {
    contractType,
    contract,
    participantName,
    participantVersion,
    participantBranch,
    contractFormat,
  } = req.body;

  const participant = await findOrCreate(Participant, { participantName });

  // look if there is already a participant version with this participant version and participant id
  // if there is, return 409 with a message "Participant version already exists"
  let participantVersionObj = await ParticipantVersion.query().findOne({
    participantVersion,
    participantId: participant.participantId,
  });

  let contractObj;

  if (participantVersionObj) {
    return res
      .status(409)
      .json({ error: "Participant version already exists" });
  }
  const contractHash = objectHash.MD5(contract);

  const formattedContract =
    contractFormat === "json" ? contract : YAML.parse(contract);

  if (!(await validateSchema(formattedContract, contractType))) {
    return res.status(409).json({ error: "Contract schema is invalid" });
  }

  contractObj = await findOrCreate(
    Contract,
    { contractHash, participantId: participant.participantId },
    {
      contract: {
        contractText:
          contractFormat === "json" ? contract : YAML.parse(contract),
      },
      contractType,
      contractFormat,
      contractHash,
      participantId: participant.participantId,
    }
  );

  // if the participant version does not already exist, create a new one
  participantVersionObj = await ParticipantVersion.query().insert({
    participantVersion,
    participantId: participant.participantId,
    contractId: contractObj.contractId,
    participantBranch,
  });

  if (contractType === "consumer") {
    const provider = await findOrCreate(Participant, {
      participantName: contract.provider.name,
    });

    const integration = await findOrCreate(Integration, {
      consumerId: participant.participantId,
      providerId: provider.participantId,
    });

    const providerContracts = await Contract.query().where(
      "participantId",
      provider.participantId
    );

    for (let providerContract of providerContracts) {
      compare(contractObj, providerContract, integration);
    }
  }

  res.status(201).json(contractObj);
});

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

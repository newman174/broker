import express from "express";
// import Contract from "../../models/Contract.js";
import db from "../../db/databaseClient.js";
import { compare } from "../../services/comparisonService.js";
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

    await db.publishConsumerContract(contract, consumer.id, consumerVersion, consumerBranch)

    res.status(201).json(contract);

    // initiate comparisons with provider specs
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

    await db.publishProviderSpec(spec, provider.id, specFormat);

    res.status(201).json(contract);

    // initiate comparisons with consumer contracts
  } else {
    res.status(400).json({ error: "Invalid contractType" });
  }
})

// router.post("/", async (req, res) => {
//   const {
//     contractType,
//     contract,
//     participantName,
//     participantVersion,
//     participantBranch,
//     contractFormat,
//   } = req.body;

//   // returns an instance of a Participent from the database, creating a new record if the participant does not already exist
//   const participant = await findOrCreate(Participant, { participantName });

//   // look if there is already a participant version with this participant version and participant id
//   // if there is, return 409 with a message "Participant version already exists"
//   let participantVersionObj = await ParticipantVersion.query().findOne({
//     participantVersion,
//     participantId: participant.participantId,
//   });

//   let contractObj;

//   // ZACH Q: should this be `!participantVersionObj` ?
//   if (participantVersionObj) {
//     return res
//       .status(409)
//       .json({ error: "Participant version already exists" });
//   }
//   const contractHash = objectHash.MD5(contract);

//   // format contract and validate that it has proper schema for its contractType
//   const formattedContract =
//     contractFormat === "json" ? contract : YAML.parse(contract);

//   if (!(await validateSchema(formattedContract, contractType))) {
//     return res.status(409).json({ error: "Contract schema is invalid" });
//   }

//   // inserts the contract into the database, unless this contract's value is identicle to
//   // an exiting contract for this participant, returns the whole contract record
//   contractObj = await findOrCreate(
//     Contract,
//     { contractHash, participantId: participant.participantId },
//     {
//       contract: {
//         contractText: formattedContract,
//       },
//       contractType,
//       contractFormat,
//       contractHash,
//       participantId: participant.participantId,
//     }
//   );

//   // if the participant version does not already exist, create a new one
//   // ZACH Q: will this query insert duplicate records (with different PKs) if version already
//   // exists? (This case is handled earlier in func where 409 may be returned)
//   participantVersionObj = await ParticipantVersion.query().insert({
//     participantVersion,
//     participantId: participant.participantId,
//     contractId: contractObj.contractId,
//     participantBranch,
//   });

//   if (contractType === "consumer") {
//     // create provider participent record if it does not already exist
//     const provider = await findOrCreate(Participant, {
//       participantName: contract.provider.name,
//     });

//     // create an integration between consumer and provider participants if it does not already exist
//     const integration = await findOrCreate(Integration, {
//       consumerId: participant.participantId,
//       providerId: provider.participantId,
//     });

//     // get the provider contract (spec) if it exists
//     const providerContracts = await Contract.query().where(
//       "participantId",
//       provider.participantId
//     );

//     // iterate over all of this provider's specs, and compare them with this consumer contract
//     for (let providerContract of providerContracts) {
//       compare(contractObj, providerContract, integration);
//     }
//   }

//   if (contractType === "provider") {
//     // get the integrations that this provider is a part of
//     const integrations = await Integration.query().where(
//       "providerId",
//       contractObj.participantId
//     );

//     // for each integration, get the consumer contracts, and perform comparison on those contracts
//     for (let integration of integrations) {
//       const consumerContracts = await Contract.query().where(
//         "participantId",
//         integration.consumerId
//       );

//       for (let consumerContract of consumerContracts) {
//         compare(consumerContract, contractObj, integration);
//       }
//     }
//   }

//   res.status(201).json(contractObj);
// });

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

import express from "express";
import Contract from "../../models/Contract.js";
import Participant from "../../models/Participant.js";
import ParticipantVersion from "../../models/ParticipantVersion.js";
import Integration from "../../models/Integration.js";

const router = express.Router();

const findOrCreate = async (model, queryObj, newObj = {}) => {
  return (
    (await model.query().findOne(queryObj)) ||
    (await model
      .query()
      .insert({ ...queryObj, ...newObj })
      .returning("*"))
  );
};

/**
 * Gets all contracts
 * @returns {array} All contracts
 */
router.get("/", async (_req, res) => {
  const contracts = await Contract.query();
  res.json(contracts);
});

/**
 * Creates a new contract
 * @param {'provider'|'consumer'} contractType - The type of contract
 * @param {string} contract - The contract
 * @param {string} participantName - The participant name
 * @param {string} participantVersion - The participant version
 * @param {string} participantBranch - The participant branch
 * @param {'json'|'yml'} contractFormat - The contract format
 * @returns {object} The created contract
 * http post localhost:3000/api/contracts participantName=hamachi contract="{}" contractType="provider"
 * If the participant does not exist, it will be created
 * If the participant exists, it will be used
 * If this is a consumer contract, the provider will be used or created
 * Need to match the consumer and provider
 * May need to create the integration
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

  if (contractType === "consumer") {
    const provider = await findOrCreate(Participant, {
      participantName: contract.provider.name,
    });

    await findOrCreate(Integration, {
      consumerId: participant.participantId,
      providerId: provider.participantId,
    });
  }

  const insertedContract = await Participant.relatedQuery("contracts")
    .for(participant.participantId)
    .insert({ contract, contractType, contractFormat })
    .returning("*");

  let participantVersionObj = await findOrCreate(
    ParticipantVersion,
    {
      participantVersion,
      participantId: participant.participantId,
    },
    {
      participantBranch,
      contractId: insertedContract.contractId,
    }
  );

  if (participantVersionObj.contractId !== insertedContract.contractId) {
    participantVersionObj = await ParticipantVersion.query({
      participantVersionId: participantVersionObj.participantVersionId,
    })
      .patch({ contractId: insertedContract.contractId })
      .returning("*");
  }

  res.status(201).json(insertedContract);
});

/**
 * Gets a contract by id
 * @param {number} id - The contract id
 * @returns {object} The contract
 */
router.get("/:id", async (req, res) => {
  const contract = await Contract.query().findById(Number(req.params.id));
  res.json(contract);
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

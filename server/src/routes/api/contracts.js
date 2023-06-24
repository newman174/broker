import express from "express";
import Contract from "../../models/Contract.js";
import Participant from "../../models/Participant.js";

const router = express.Router();

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
 * @param {string} contractType - The type of contract
 * @param {string} contract - The contract
 * @param {string} participantName - The participant name
 * @returns {object} The created contract
 * http post localhost:3000/api/contracts participant_name=hamachi contract="{}" contract_type="provider"
 */
router.post("/", async (req, res) => {
  const {
    contractType: contract_type,
    contract,
    participantName: participant_name,
  } = req.body;

  const participantId =
    (await Participant.query().findOne({
      participant_name,
    })) || (await Participant.query().insert({ participant_name }));

  const insertedContract = await Participant.relatedQuery("contracts")
    .for(participantId)
    .insert({ contract, contract_type });

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
  const { contract_type, contract } = req.body;
  const id = Number(req.params.id);
  const updatedContract = await Contract.query().patchAndFetchById(id, {
    contract_type,
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

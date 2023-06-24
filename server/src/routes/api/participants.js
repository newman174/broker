import express from "express";
import Participant from "../../models/Participant.js";

const router = express.Router();

/**
 * Gets all participants
 * @returns {array} All participants
 */
router.get("/", async (_req, res) => {
  const participants = await Participant.query();
  res.json(participants);
});

/**
 * Creates a new participant
 * @param {string} participantName - The participant name
 * @returns {object} The created participant
 * http post localhost:3000/api/participants participant_name=hamachi
 */
router.post("/", async (req, res) => {
  const { participantName: participant_name } = req.body;

  const insertedParticipant = await Participant.query().insert({
    participant_name,
  });

  res.status(201).json(insertedParticipant);
});

/**
 * Gets a participant by id
 * @param {number} id - The participant id
 * @returns {object} The participant
 */
router.get("/:id", async (req, res) => {
  const participant = await Participant.query().findById(Number(req.params.id));
  res.json(participant);
});

/**
 * Updates a participant by id
 * @param {number} id - The participant id
 * @param {string} participantName - The participant's name
 * @returns {object} The updated participant
 */
router.put("/:id", async (req, res) => {
  const { participantName: participant_name } = req.body;
  const id = Number(req.params.id);
  const updatedParticipant = await Participant.query().patchAndFetchById(id, {
    participant_name,
  });
  if (!updatedParticipant) {
    res.status(404).send();
  } else {
    res.json(updatedParticipant);
  }
});

/**
 * Deletes a participant by id
 * @param {number} id - The participant id
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const participant = await Participant.query().deleteById(Number(id));
    if (!participant) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send();
  }
});

export default router;

import express from "express";

import Contract from "../../models/Contract.js";
import Participant from "../../models/Participant.js";
import ParticipantVersion from "../../models/ParticipantVersion.js";
import Integration from "../../models/Integration.js";
import Comparison from "../../models/Comparison.js";

import { fmtJG } from "../../utils/queryHelpers.js";

const router = express.Router();

const models = {};

[Comparison, Contract, Participant, ParticipantVersion, Integration].forEach(
  (model) => {
    models[model.tableName] = model;
  }
);

router.use("/:modelPath", async (req, res) => {
  const { modelPath } = req.params;
  const model = models[modelPath];

  if (!model) {
    res.status(404).send();
    return;
  }

  let query = model.query();

  const { joinGraph } = req.body;

  if (joinGraph) {
    query = query.withGraphJoined(fmtJG(joinGraph));
  }

  const results = await query;

  res.json(results);
});

export default router;
